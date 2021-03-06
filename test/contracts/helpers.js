import chai from 'chai';
import supertest from 'supertest';
import Joi from 'joi';
import joiAssert from 'joi-assert';
import app from '../../app';

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.Joi = Joi;
global.joiAssert = joiAssert;
