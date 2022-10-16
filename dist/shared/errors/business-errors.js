"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessError = exports.BusinessLogicException = void 0;
function BusinessLogicException(message, type) {
    this.message = message;
    this.type = type;
}
exports.BusinessLogicException = BusinessLogicException;
var BusinessError;
(function (BusinessError) {
    BusinessError[BusinessError["NOT_FOUND"] = 0] = "NOT_FOUND";
    BusinessError[BusinessError["PRECONDITION_FAILED"] = 1] = "PRECONDITION_FAILED";
    BusinessError[BusinessError["BAD_REQUEST"] = 2] = "BAD_REQUEST";
})(BusinessError = exports.BusinessError || (exports.BusinessError = {}));
//# sourceMappingURL=business-errors.js.map