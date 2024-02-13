"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFeatures = void 0;
class ApiFeatures {
    mongooseQuery;
    mongooseQueryCalcer;
    queryString;
    paginateResults;
    totalResults = 0;
    constructor(mongooseQuery, mongooseQueryCalcer, queryString, paginateResults) {
        this.mongooseQuery = mongooseQuery;
        this.mongooseQueryCalcer = mongooseQueryCalcer;
        this.queryString = queryString;
        this.paginateResults = paginateResults;
    }
    async filter(filterBy) {
        if (!this.queryString.keyword) {
            const queryFilters = { ...this.queryString };
            const querySortParams = ["limit", "page", "sort", "fields"];
            querySortParams.forEach((key) => delete queryFilters[key]);
            const queryStr = JSON.stringify(queryFilters).replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
            if (!filterBy) {
                this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
                this.mongooseQueryCalcer = await this.mongooseQueryCalcer.find(JSON.parse(queryStr));
            }
            else {
                this.mongooseQuery = this.mongooseQuery.find(filterBy);
                this.mongooseQueryCalcer = await this.mongooseQueryCalcer.find(filterBy);
            }
            this.totalResults = this.mongooseQueryCalcer.length;
        }
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.replace(/,/g, ' ');
            this.mongooseQuery.sort(sortBy);
        }
        else {
            this.mongooseQuery.sort("-createdAt");
        }
        return this;
    }
    fieldsLimit() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.replace(/,/g, ' ');
            this.mongooseQuery.select(fields);
        }
        else {
            this.mongooseQuery.select("-__v");
        }
        return this;
    }
    async search(searchMethod, payload) {
        if (this.queryString.keyword) {
            const keyword = this.queryString.keyword;
            let query = {};
            if (searchMethod === 'ByPhoneNumber') {
                query = {
                    $or: [{ clientPhoneNumber: { $regex: keyword, $options: "i" } }],
                };
            }
            else if (searchMethod === 'ByClientName') {
                query = {
                    clientName: { $regex: keyword, $options: "i" },
                    ...payload
                };
            }
            else {
                query = {
                    clientPhoneNumber: { $regex: keyword, $options: "i" },
                    ...payload
                };
            }
            this.mongooseQuery = this.mongooseQuery.find(query);
            this.mongooseQueryCalcer = await this.mongooseQueryCalcer.find(query);
            this.totalResults = this.mongooseQueryCalcer.length;
        }
        return this;
    }
    pagination() {
        const page = Number(this.queryString.page) || 1;
        const limit = Number(this.queryString.limit) || 25;
        const skip = (page - 1) * limit;
        const totalPages = Math.ceil(this.totalResults / limit);
        this.paginateResults = {
            limit: limit,
            currentPage: page,
            totalPages: Math.ceil(this.totalResults / limit),
            totalResults: this.totalResults,
            next: page === totalPages ? null : page + 1,
            prev: page - 1 === 0 ? null : page - 1,
        };
        this.mongooseQuery.skip(skip).limit(limit);
        return this;
    }
}
exports.ApiFeatures = ApiFeatures;
