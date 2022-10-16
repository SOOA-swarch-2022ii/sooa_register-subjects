"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessErrorsInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const business_errors_1 = require("../errors/business-errors");
let BusinessErrorsInterceptor = class BusinessErrorsInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)((error) => {
            if (error.type === business_errors_1.BusinessError.NOT_FOUND)
                throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
            else if (error.type === business_errors_1.BusinessError.PRECONDITION_FAILED)
                throw new common_1.HttpException(error.message, common_1.HttpStatus.PRECONDITION_FAILED);
            else if (error.type === business_errors_1.BusinessError.BAD_REQUEST)
                throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
            else
                throw error;
        }));
    }
};
BusinessErrorsInterceptor = __decorate([
    (0, common_1.Injectable)()
], BusinessErrorsInterceptor);
exports.BusinessErrorsInterceptor = BusinessErrorsInterceptor;
//# sourceMappingURL=interceptor.js.map