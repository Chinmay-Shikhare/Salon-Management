import feedbackDB from "./feedback.schema";
import { IFeedback } from "./feedback.types";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";


const registerFeedback = (feedback: IFeedback) => feedbackDB.create(feedback);

const getfeedback = () => feedbackDB.find().populate('serviceBy').populate('servicedAvailed').exec();

const getFeedbackByID = (id: string) => feedbackDB.findOne({ _id: id }).populate('serviceBy').populate('servicedAvailed').exec();

const getAverage = () => feedbackDB.aggregate(
    [
        {
            $group: {
                _id: null,
                ambienceAverage: { $avg: "$ambienceRating" },
                cleanlinessAverage: { $avg: "$cleanlinessRating" },
                ServiceAverage: { $avg: "$ServiceRating" },
                OverallExpereinceAverage: { $avg: "$OverallExpereinceRating" }
            }
        }
    ]
)

const getOverallAverage = () => feedbackDB.aggregate([
    {
        $group: {
            _id: null,
            ambienceAverage: { $avg: "$ambienceRating" },
            cleanlinessAverage: { $avg: "$cleanlinessRating" },
            ServiceAverage: { $avg: "$ServiceRating" },
            OverallExpereinceAverage: { $avg: "$OverallExpereinceRating" }
        }
    },
    {
        $project: {
            ambienceAverage: 1,
            cleanlinessAverage: 1,
            ServiceAverage: 1,
            OverallExpereinceAverage: 1,
            overallAverage: {
                $avg: [
                    '$ambienceAverage',
                    '$cleanlinessAverage',
                    '$ServiceAverage',
                    '$OverallExpereinceAverage'
                ]
            }
        }
    }
])

const perFormAverage = (id: string) => feedbackDB.aggregate([
    {
        $match: {
            _id: new Types.ObjectId(id)
        }
    },
    {
        $project:
        {
            ambienceRating: 1,
            cleanlinessRating: 1,
            ServiceRating: 1,
            OverallExpereinceRating: 1,
            avgRating: {
                $avg: [
                    '$ambienceRating',
                    '$cleanlinessRating',
                    '$ServiceRating',
                    '$OverallExpereinceRating'
                ]
            }
        }
    }
])


const filterAverage = (filter: any) => {
    const { page, itemsPerPage, fromDate, toDate, overallAverage, serviceBy } = filter;
    let { serviceAvailed } = filter;

    let filters = [];
    let filteredQuery = [];

    if (fromDate) {
        filteredQuery.push({ 'createdAt': { $gte: new Date(fromDate) } });
    }

    if (toDate) {
        filteredQuery.push({ 'createdAt': { $lte: new Date(toDate) } });
    }

    if (serviceAvailed) {
        serviceAvailed = serviceAvailed.map((service: string) => new Types.ObjectId(service));
        filteredQuery.push({ 'servicedAvailed': { $in: serviceAvailed } })
    }

    if (serviceBy) {
        filteredQuery.push({ 'serviceBy': new ObjectId(serviceBy) });
    }
    
    if (overallAverage) {
        filteredQuery.push({ 'overallAverage': { $gte: +overallAverage } });
    }

    const match = {
        $match: {
            $and: filteredQuery
        }
    };

    if (filteredQuery.length) { 
        filters.push(match);
    }

    if (page && itemsPerPage) {
        filters.push({ $skip: (+page - 1) * +itemsPerPage });
        filters.push({ $limit: +itemsPerPage });
    }

    return feedbackDB.aggregate([
        {
            $project: {
                customerName: 1,
                customerAge: 1,
                customerEmail: 1,
                servicedAvailed: 1,
                serviceBy: 1,
                ambienceRating: 1,
                cleanlinessRating: 1,
                ServiceRating: 1,
                OverallExpereinceRating: 1,
                comments: 1,
                createdAt: 1,
                overallAverage: {
                    $avg: [
                        '$ambienceRating',
                        '$cleanlinessRating',
                        '$ServiceRating',
                        '$OverallExpereinceRating'
                    ]
                }
            }
        },
        ...filters,
        {
            $lookup: {
                from: 'users',
                localField: 'serviceBy',
                foreignField: '_id',
                as: 'serviceBy'
            }
        },
        {
            $lookup: {
                from: 'services',
                localField: 'servicedAvailed',
                foreignField: '_id',
                as: 'servicedAvailed'
            }
        },
    ])
}

export default {
    registerFeedback, getfeedback, getAverage, getOverallAverage, getFeedbackByID, perFormAverage,
    filterAverage
}