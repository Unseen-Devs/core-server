"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendGridTransport = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
class SendGridTransport {
    constructor(options) {
        this.name = 'nodemailer-sendgrid';
        this.version = '1.0.0';
        if (options.apiKey) {
            mail_1.default.setApiKey(options.apiKey);
        }
    }
    send(mail, callback) {
        mail.normalize((err, source) => {
            var _a;
            if (err || !source) {
                return callback(err);
            }
            let data = {};
            if (Array.isArray(source.to)) {
                data.to = source.to.map((v) => {
                    if (typeof v === 'string') {
                        return {
                            email: v,
                        };
                    }
                    return {
                        email: v.address,
                        name: v.name,
                    };
                });
            }
            else if (typeof source.to === 'object') {
                data.to = { email: source.to.address, name: source.to.name };
            }
            if (typeof source.from === 'object') {
                data.from = { email: source.from.address, name: source.from.name };
            }
            else if (typeof source.from === 'string') {
                data.from = { email: source.from };
            }
            mail_1.default
                .send(Object.assign(Object.assign({}, data), { attachments: (_a = source.attachments) === null || _a === void 0 ? void 0 : _a.map((v) => ({
                    content: v.content,
                    filename: v.filename,
                    contentId: v.cid,
                    disposition: v.contentDisposition,
                    type: v.contentType,
                })), html: source.html, subject: source.subject, text: source.text }))
                .then((res) => {
                callback(null, res);
            })
                .catch((err) => {
                callback(err);
            });
        });
    }
}
exports.SendGridTransport = SendGridTransport;
//# sourceMappingURL=nodemailer-sendgrid.js.map