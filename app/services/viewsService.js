"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installView = exports.adminView = exports.homeView = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const fs_1 = __importDefault(require("fs"));
const StoreSettingsModel_1 = require("../models/StoreSettingsModel");
exports.homeView = (0, express_async_handler_1.default)(async (req, res) => {
    const sotreSettings = await StoreSettingsModel_1.StoreSettings.find({});
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    let header = "";
    if (sotreSettings && sotreSettings.length > 0 && sotreSettings[0].headCode) {
        header = sotreSettings[0].headCode;
    }
    const html = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
            ${header}
            <script>
                //Part1
                !(function (w, d, t) {
                    w.TiktokAnalyticsObject = t;
                    var ttq = (w[t] = w[t] || []);
                    (ttq.methods = [
                        "page",
                        "track",
                        "identify",
                        "instances",
                        "debug",
                        "on",
                        "off",
                        "once",
                        "ready",
                        "alias",
                        "group",
                        "enableCookie",
                        "disableCookie",
                    ]),
                        (ttq.setAndDefer = function (t, e) {
                            t[e] = function () {
                                t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                            };
                        });
                    for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
                    (ttq.instance = function (t) {
                        for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
                        return e;
                    }),
                        (ttq.load = function (e, n) {
                            var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                            (ttq._i = ttq._i || {}),
                                (ttq._i[e] = []),
                                (ttq._i[e]._u = i),
                                (ttq._t = ttq._t || {}),
                                (ttq._t[e] = +new Date()),
                                (ttq._o = ttq._o || {}),
                                (ttq._o[e] = n || {});
                            var o = document.createElement("script");
                            (o.type = "text/javascript"), (o.async = !0), (o.src = i + "?sdkid=" + e + "&lib=" + t);
                            var a = document.getElementsByTagName("script")[0];
                            a.parentNode.insertBefore(o, a);
                        });
                })(window, document, "ttq");
            </script>
    
            <!-- Facebook Pixel Code -->
            <script>
                !(function (f, b, e, v, n, t, s) {
                    if (f.fbq) return;
                    n = f.fbq = function () {
                        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                    };
                    if (!f._fbq) f._fbq = n;
                    n.push = n;
                    n.loaded = !0;
                    n.version = "2.0";
                    n.queue = [];
                    t = b.createElement(e);
                    t.async = !0;
                    t.src = v;
                    s = b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s);
                })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
            </script>
            <script type="module" crossorigin src="/assets/index-WITH6Pj7.js"></script>
            <link rel="stylesheet" crossorigin href="/assets/index-IZka7ouJ.css">
        </head>
        <body>
            <div id="root"></div>
        </body>
    </html>
    `;
    res.send(html);
});
exports.adminView = (0, express_async_handler_1.default)((req, res) => {
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    fs_1.default.readFile("app/public/admin/index.html", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.send(err.message);
            return;
        }
        res.send(data);
    });
});
exports.installView = (0, express_async_handler_1.default)((req, res) => {
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    fs_1.default.readFile("app/public/install/index.html", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.send(err.message);
            return;
        }
        res.send(data);
    });
});
