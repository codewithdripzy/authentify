import { NextFunction, Request, Response } from "express";
import { HTTP_RESPONSE_CODE, APP_RESPONSE_CODE  } from "../constants/values";

const verifyAPI = (req : Request, res : Response, next : NextFunction) => {
    try {
        const { v } = req.body;
        const { version } = req.params;

        if (version === `${v}`) {
            next();
        } else {
            res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).json({
                code : APP_RESPONSE_CODE.API.INVALID_VERSION,
                message: 'Invalid API version. Refer to the documentation for proper implementation.'
            });
        }
    } catch (error) {
        res.status(HTTP_RESPONSE_CODE.INTERNAL_SERVER_ERROR).json({
            code : APP_RESPONSE_CODE.API.INVALID_REQUEST,
            message : 'An error occurred while processing your request. Please try again later.'
        });
    }
}

const defaulFallback = (req : Request, res : Response) => {
    const { name } = req.body;
    
    res.status(HTTP_RESPONSE_CODE.OK).json({
        message : `Welcome to ${name} Auth API v1 🚀🎉. Please refer to the documentation for proper implementation.`
    });
}

const noRouteFound = (req : Request, res : Response) => {
    res.status(HTTP_RESPONSE_CODE.NOT_FOUND).json({
        code : APP_RESPONSE_CODE.API.INVALID_ENDPOINT,
        message : 'The endpoint you are trying to access does not exist. Refer to the documentation for proper implementation.'
    });
}

export { verifyAPI, defaulFallback, noRouteFound }