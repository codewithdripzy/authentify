import { Request, Response } from "express";
import { ErrorPacketParams } from "mysql2"
import { Error as MongooseError } from "mongoose";

declare type AuthenticatorController = (req : Request, res : Response) => void;
declare type DatabaseError = MongooseError;

export type { AuthenticatorController };