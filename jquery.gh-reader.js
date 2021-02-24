/*! jquery-gh-readme v1.0.0 */
(function() {
    function a(a) { this.tokens = [], this.tokens.links = {}, this.options = a || i.defaults, this.rules = j.normal, this.options.gfm && (this.rules = this.options.tables ? j.tables : j.gfm) }

    function b(a, b) {
        if (this.options = b || i.defaults, this.links = a, this.rules = k.normal, this.renderer = this.options.renderer || new c, !this.links) throw new Error("Tokens array requires a `links` property.");
        this.options.gfm ? this.rules = this.options.breaks ? k.breaks : k.gfm : this.options.pedantic && (this.rules = k.pedantic)
    }

    function c() {}

    function d(a) { this.tokens = [], this.token = null, this.options = a || i.defaults, this.options.renderer = this.options.renderer || new c, this.renderer = this.options.renderer }

    function e(a, b) { return a.replace(b ? /&/g : /&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;") }

    function f(a, b) {
        return a = a.source, b = b || "",
            function c(d, e) { return d ? (e = e.source || e, e = e.replace(/(^|[^\[])\^/g, "$1"), a = a.replace(d, e), c) : new RegExp(a, b) }
    }

    function g() {}

    function h(a) { for (var b, c, d = 1; d < arguments.length; d++) { b = arguments[d]; for (c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]) } return a }

    function i(b, c, f) {
        if (f || "function" == typeof c) {
            f || (f = c, c = null), c = h({}, i.defaults, c || {});
            var g, j, k = c.highlight,
                l = 0;
            try { g = a.lex(b, c) } catch (m) { return f(m) }
            j = g.length;
            var n = function() { var a, b; try { a = d.parse(g, c) } catch (e) { b = e } return c.highlight = k, b ? f(b) : f(null, a) };
            if (!k || k.length < 3) return n();
            if (delete c.highlight, !j) return n();
            for (; l < g.length; l++) ! function(a) { return "code" !== a.type ? --j || n() : k(a.text, a.lang, function(b, c) { return null == c || c === a.text ? --j || n() : (a.text = c, a.escaped = !0, void(--j || n())) }) }(g[l])
        } else try { return c && (c = h({}, i.defaults, c)), d.parse(a.lex(b, c), c) } catch (m) { if (m.message += "\nPlease report this to https://github.com/chjj/marked.", (c || i.defaults).silent) return "<p>An error occured:</p><pre>" + e(m.message + "", !0) + "</pre>"; throw m }
    }
    var j = { newline: /^\n+/, code: /^( {4}[^\n]+\n*)+/, fences: g, hr: /^( *[-*_]){3,} *(?:\n+|$)/, heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/, nptable: g, lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/, blockquote: /^( *>[^\n]+(\n[^\n]+)*\n*)+/, list: /^( *)(bull) [\s\S]+?(?:hr|\n{2,}(?! )(?!\1bull )\n*|\s*$)/, html: /^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/, def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/, table: g, paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/, text: /^[^\n]+/ };
    j.bullet = /(?:[*+-]|\d+\.)/, j.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/, j.item = f(j.item, "gm")(/bull/g, j.bullet)(), j.list = f(j.list)(/bull/g, j.bullet)("hr", /\n+(?=(?: *[-*_]){3,} *(?:\n+|$))/)(), j._tag = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|@)\\b", j.html = f(j.html)("comment", /<!--[\s\S]*?-->/)("closed", /<(tag)[\s\S]+?<\/\1>/)("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, j._tag)(), j.paragraph = f(j.paragraph)("hr", j.hr)("heading", j.heading)("lheading", j.lheading)("blockquote", j.blockquote)("tag", "<" + j._tag)("def", j.def)(), j.normal = h({}, j), j.gfm = h({}, j.normal, { fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/, paragraph: /^/ }), j.gfm.paragraph = f(j.paragraph)("(?!", "(?!" + j.gfm.fences.source.replace("\\1", "\\2") + "|" + j.list.source.replace("\\1", "\\3") + "|")(), j.tables = h({}, j.gfm, { nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/, table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/ }), a.rules = j, a.lex = function(b, c) { var d = new a(c); return d.lex(b) }, a.prototype.lex = function(a) { return a = a.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/ /g, " ").replace(/␤/g, "\n"), this.token(a, !0) }, a.prototype.token = function(a, b) {
        for (var c, d, e, f, g, h, i, k, l, a = a.replace(/^ +$/gm, ""); a;)
            if ((e = this.rules.newline.exec(a)) && (a = a.substring(e[0].length), e[0].length > 1 && this.tokens.push({ type: "space" })), e = this.rules.code.exec(a)) a = a.substring(e[0].length), e = e[0].replace(/^ {4}/gm, ""), this.tokens.push({ type: "code", text: this.options.pedantic ? e : e.replace(/\n+$/, "") });
            else if (e = this.rules.fences.exec(a)) a = a.substring(e[0].length), this.tokens.push({ type: "code", lang: e[2], text: e[3] });
        else if (e = this.rules.heading.exec(a)) a = a.substring(e[0].length), this.tokens.push({ type: "heading", depth: e[1].length, text: e[2] });
        else if (b && (e = this.rules.nptable.exec(a))) {
            for (a = a.substring(e[0].length), h = { type: "table", header: e[1].replace(/^ *| *\| *$/g, "").split(/ *\| */), align: e[2].replace(/^ *|\| *$/g, "").split(/ *\| */), cells: e[3].replace(/\n$/, "").split("\n") }, k = 0; k < h.align.length; k++) h.align[k] = /^ *-+: *$/.test(h.align[k]) ? "right" : /^ *:-+: *$/.test(h.align[k]) ? "center" : /^ *:-+ *$/.test(h.align[k]) ? "left" : null;
            for (k = 0; k < h.cells.length; k++) h.cells[k] = h.cells[k].split(/ *\| */);
            this.tokens.push(h)
        } else if (e = this.rules.lheading.exec(a)) a = a.substring(e[0].length), this.tokens.push({ type: "heading", depth: "=" === e[2] ? 1 : 2, text: e[1] });
        else if (e = this.rules.hr.exec(a)) a = a.substring(e[0].length), this.tokens.push({ type: "hr" });
        else if (e = this.rules.blockquote.exec(a)) a = a.substring(e[0].length), this.tokens.push({ type: "blockquote_start" }), e = e[0].replace(/^ *> ?/gm, ""), this.token(e, b), this.tokens.push({ type: "blockquote_end" });
        else if (e = this.rules.list.exec(a)) {
            for (a = a.substring(e[0].length), f = e[2], this.tokens.push({ type: "list_start", ordered: f.length > 1 }), e = e[0].match(this.rules.item), c = !1, l = e.length, k = 0; l > k; k++) h = e[k], i = h.length, h = h.replace(/^ *([*+-]|\d+\.) +/, ""), ~h.indexOf("\n ") && (i -= h.length, h = this.options.pedantic ? h.replace(/^ {1,4}/gm, "") : h.replace(new RegExp("^ {1," + i + "}", "gm"), "")), this.options.smartLists && k !== l - 1 && (g = j.bullet.exec(e[k + 1])[0], f === g || f.length > 1 && g.length > 1 || (a = e.slice(k + 1).join("\n") + a, k = l - 1)), d = c || /\n\n(?!\s*$)/.test(h), k !== l - 1 && (c = "\n" === h.charAt(h.length - 1), d || (d = c)), this.tokens.push({ type: d ? "loose_item_start" : "list_item_start" }), this.token(h, !1), this.tokens.push({ type: "list_item_end" });
            this.tokens.push({ type: "list_end" })
        } else if (e = this.rules.html.exec(a)) a = a.substring(e[0].length), this.tokens.push({ type: this.options.sanitize ? "paragraph" : "html", pre: "pre" === e[1] || "script" === e[1] || "style" === e[1], text: e[0] });
        else if (b && (e = this.rules.def.exec(a))) a = a.substring(e[0].length), this.tokens.links[e[1].toLowerCase()] = { href: e[2], title: e[3] };
        else if (b && (e = this.rules.table.exec(a))) {
            for (a = a.substring(e[0].length), h = { type: "table", header: e[1].replace(/^ *| *\| *$/g, "").split(/ *\| */), align: e[2].replace(/^ *|\| *$/g, "").split(/ *\| */), cells: e[3].replace(/(?: *\| *)?\n$/, "").split("\n") }, k = 0; k < h.align.length; k++) h.align[k] = /^ *-+: *$/.test(h.align[k]) ? "right" : /^ *:-+: *$/.test(h.align[k]) ? "center" : /^ *:-+ *$/.test(h.align[k]) ? "left" : null;
            for (k = 0; k < h.cells.length; k++) h.cells[k] = h.cells[k].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
            this.tokens.push(h)
        } else if (b && (e = this.rules.paragraph.exec(a))) a = a.substring(e[0].length), this.tokens.push({ type: "paragraph", text: "\n" === e[1].charAt(e[1].length - 1) ? e[1].slice(0, -1) : e[1] });
        else if (e = this.rules.text.exec(a)) a = a.substring(e[0].length), this.tokens.push({ type: "text", text: e[0] });
        else if (a) throw new Error("Infinite loop on byte: " + a.charCodeAt(0));
        return this.tokens
    };
    var k = { escape: /^\\([\\`*{}\[\]()#+\-.!_>])/, autolink: /^<([^ >]+(@|:\/)[^ >]+)>/, url: g, tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/, link: /^!?\[(inside)\]\(href\)/, reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/, nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/, strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/, em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/, code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, br: /^ {2,}\n(?!\s*$)/, del: g, text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/ };
    k._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/, k._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/, k.link = f(k.link)("inside", k._inside)("href", k._href)(), k.reflink = f(k.reflink)("inside", k._inside)(), k.normal = h({}, k), k.pedantic = h({}, k.normal, { strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/, em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/ }), k.gfm = h({}, k.normal, { escape: f(k.escape)("])", "~|])")(), url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, del: /^~~(?=\S)([\s\S]*?\S)~~/, text: f(k.text)("]|", "~]|")("|", "|https?://|")() }), k.breaks = h({}, k.gfm, { br: f(k.br)("{2,}", "*")(), text: f(k.gfm.text)("{2,}", "*")() }), b.rules = k, b.output = function(a, c, d) { var e = new b(c, d); return e.output(a) }, b.prototype.output = function(a) {
        for (var b, c, d, f, g = ""; a;)
            if (f = this.rules.escape.exec(a)) a = a.substring(f[0].length), g += f[1];
            else if (f = this.rules.autolink.exec(a)) a = a.substring(f[0].length), "@" === f[2] ? (c = this.mangle(":" === f[1].charAt(6) ? f[1].substring(7) : f[1]), d = this.mangle("mailto:") + c) : (c = e(f[1]), d = c), g += this.renderer.link(d, null, c);
        else if (f = this.rules.url.exec(a)) a = a.substring(f[0].length), c = e(f[1]), d = c, g += this.renderer.link(d, null, c);
        else if (f = this.rules.tag.exec(a)) a = a.substring(f[0].length), g += this.options.sanitize ? e(f[0]) : f[0];
        else if (f = this.rules.link.exec(a)) a = a.substring(f[0].length), g += this.outputLink(f, { href: f[2], title: f[3] });
        else if ((f = this.rules.reflink.exec(a)) || (f = this.rules.nolink.exec(a))) {
            if (a = a.substring(f[0].length), b = (f[2] || f[1]).replace(/\s+/g, " "), b = this.links[b.toLowerCase()], !b || !b.href) { g += f[0].charAt(0), a = f[0].substring(1) + a; continue }
            g += this.outputLink(f, b)
        } else if (f = this.rules.strong.exec(a)) a = a.substring(f[0].length), g += this.renderer.strong(this.output(f[2] || f[1]));
        else if (f = this.rules.em.exec(a)) a = a.substring(f[0].length), g += this.renderer.em(this.output(f[2] || f[1]));
        else if (f = this.rules.code.exec(a)) a = a.substring(f[0].length), g += this.renderer.codespan(e(f[2], !0));
        else if (f = this.rules.br.exec(a)) a = a.substring(f[0].length), g += this.renderer.br();
        else if (f = this.rules.del.exec(a)) a = a.substring(f[0].length), g += this.renderer.del(this.output(f[1]));
        else if (f = this.rules.text.exec(a)) a = a.substring(f[0].length), g += e(this.smartypants(f[0]));
        else if (a) throw new Error("Infinite loop on byte: " + a.charCodeAt(0));
        return g
    }, b.prototype.outputLink = function(a, b) {
        var c = e(b.href),
            d = b.title ? e(b.title) : null;
        return "!" !== a[0].charAt(0) ? this.renderer.link(c, d, this.output(a[1])) : this.renderer.image(c, d, e(a[1]))
    }, b.prototype.smartypants = function(a) { return this.options.smartypants ? a.replace(/--/g, "—").replace(/(^|[-—/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-—/(\[{‘\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…") : a }, b.prototype.mangle = function(a) { for (var b, c = "", d = a.length, e = 0; d > e; e++) b = a.charCodeAt(e), Math.random() > .5 && (b = "x" + b.toString(16)), c += "&#" + b + ";"; return c }, c.prototype.code = function(a, b, c, d) {
        if (d = d || {}, d.highlight) {
            var f = d.highlight(a, b);
            null != f && f !== a && (c = !0, a = f)
        }
        return b ? '<pre><code class="' + d.langPrefix + b + '">' + (c ? a : e(a)) + "\n</code></pre>\n" : "<pre><code>" + (c ? a : e(a, !0)) + "\n</code></pre>"
    }, c.prototype.blockquote = function(a) { return "<blockquote>\n" + a + "</blockquote>\n" }, c.prototype.html = function(a) { return a }, c.prototype.heading = function(a, b, c, d) { return "<h" + b + ' id="' + d.headerPrefix + c.toLowerCase().replace(/[^\w]+/g, "-") + '">' + a + "</h" + b + ">\n" }, c.prototype.hr = function() { return "<hr>\n" }, c.prototype.list = function(a, b) { var c = b ? "ol" : "ul"; return "<" + c + ">\n" + a + "</" + c + ">\n" }, c.prototype.listitem = function(a) { return "<li>" + a + "</li>\n" }, c.prototype.paragraph = function(a) { return "<p>" + a + "</p>\n" }, c.prototype.table = function(a, b) { return "<table>\n<thead>\n" + a + "</thead>\n<tbody>\n" + b + "</tbody>\n</table>\n" }, c.prototype.tablerow = function(a) { return "<tr>\n" + a + "</tr>\n" }, c.prototype.tablecell = function(a, b) {
        var c = b.header ? "th" : "td",
            d = b.align ? "<" + c + ' style="text-align:' + b.align + '">' : "<" + c + ">";
        return d + a + "</" + c + ">\n"
    }, c.prototype.strong = function(a) { return "<strong>" + a + "</strong>" }, c.prototype.em = function(a) { return "<em>" + a + "</em>" }, c.prototype.codespan = function(a) { return "<code>" + a + "</code>" }, c.prototype.br = function() { return "<br>" }, c.prototype.del = function(a) { return "<del>" + a + "</del>" }, c.prototype.link = function(a, b, c) { var d = '<a href="' + a + '"'; return b && (d += ' title="' + b + '"'), d += ">" + c + "</a>" }, c.prototype.image = function(a, b, c) { var d = '<img src="' + a + '" alt="' + c + '"'; return b && (d += ' title="' + b + '"'), d += ">" }, d.parse = function(a, b, c) { var e = new d(b, c); return e.parse(a) }, d.prototype.parse = function(a) { this.inline = new b(a.links, this.options, this.renderer), this.tokens = a.reverse(); for (var c = ""; this.next();) c += this.tok(); return c }, d.prototype.next = function() { return this.token = this.tokens.pop() }, d.prototype.peek = function() { return this.tokens[this.tokens.length - 1] || 0 }, d.prototype.parseText = function() {
        for (var a = this.token.text;
            "text" === this.peek().type;) a += "\n" + this.next().text;
        return this.inline.output(a)
    }, d.prototype.tok = function() {
        switch (this.token.type) {
            case "space":
                return "";
            case "hr":
                return this.renderer.hr();
            case "heading":
                return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text, this.options);
            case "code":
                return this.renderer.code(this.token.text, this.token.lang, this.token.escaped, this.options);
            case "table":
                var a, b, c, d, e, f = "",
                    g = "";
                for (c = "", a = 0; a < this.token.header.length; a++) d = { header: !0, align: this.token.align[a] }, c += this.renderer.tablecell(this.inline.output(this.token.header[a]), { header: !0, align: this.token.align[a] });
                for (f += this.renderer.tablerow(c), a = 0; a < this.token.cells.length; a++) {
                    for (b = this.token.cells[a], c = "", e = 0; e < b.length; e++) c += this.renderer.tablecell(this.inline.output(b[e]), { header: !1, align: this.token.align[e] });
                    g += this.renderer.tablerow(c)
                }
                return this.renderer.table(f, g);
            case "blockquote_start":
                for (var g = "";
                    "blockquote_end" !== this.next().type;) g += this.tok();
                return this.renderer.blockquote(g);
            case "list_start":
                for (var g = "", h = this.token.ordered;
                    "list_end" !== this.next().type;) g += this.tok();
                return this.renderer.list(g, h);
            case "list_item_start":
                for (var g = "";
                    "list_item_end" !== this.next().type;) g += "text" === this.token.type ? this.parseText() : this.tok();
                return this.renderer.listitem(g);
            case "loose_item_start":
                for (var g = "";
                    "list_item_end" !== this.next().type;) g += this.tok();
                return this.renderer.listitem(g);
            case "html":
                var i = this.token.pre || this.options.pedantic ? this.token.text : this.inline.output(this.token.text);
                return this.renderer.html(i);
            case "paragraph":
                return this.renderer.paragraph(this.inline.output(this.token.text));
            case "text":
                return this.renderer.paragraph(this.parseText())
        }
    }, g.exec = g, i.options = i.setOptions = function(a) { return h(i.defaults, a), i }, i.defaults = { gfm: !0, tables: !0, breaks: !1, pedantic: !1, sanitize: !1, smartLists: !1, silent: !1, highlight: null, langPrefix: "lang-", smartypants: !1, headerPrefix: "", renderer: new c }, i.Parser = d, i.parser = d.parse, i.Renderer = c, i.Lexer = a, i.lexer = a.lex, i.InlineLexer = b, i.inlineLexer = b.output, i.parse = i, "object" == typeof exports ? module.exports = i : "function" == typeof define && define.amd ? define(function() { return i }) : this.marked = i
}).call(function() { return this || ("undefined" != typeof window ? window : global) }()),
    function(a) {
        function b(a) {
            var b, c, e, f, g, h = "",
                i = "",
                j = "",
                k = 0;
            a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            do e = d.indexOf(a.charAt(k++)), f = d.indexOf(a.charAt(k++)), g = d.indexOf(a.charAt(k++)), j = d.indexOf(a.charAt(k++)), b = e << 2 | f >> 4, c = (15 & f) << 4 | g >> 2, i = (3 & g) << 6 | j, h += String.fromCharCode(b), 64 != g && (h += String.fromCharCode(c)), 64 != j && (h += String.fromCharCode(i)), b = c = i = "", e = f = g = j = ""; while (k < a.length);
            return h
        }

        function c(a) { return marked(a) }
        var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        a.fn.readme = function(d) {
            var e = new a.Deferred,
                f = this,
                g = d.owner,
                h = d.repo;
            return a.get("https://api.github.com/repos/" + g + "/" + h + "/readme", function(d) {
                console.log("readme pulled.")
                var g = b(d.content),
                    h = c(g);
                a(f).html(h), e.resolve()
            }), e.promise()
        }
    }(jQuery);