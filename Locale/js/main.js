// Remove this for running standalone App ----

function backAppsHome() {
    history.go(-1);
}
// -------------------------------------------
(function() {
    var locale = {
        ROWCOUNT: 13,
        COLCOUNT: 7,
        pageCount: 7,
        pageNow: 1,
        search: "",
        langs: null,
        locale: ""
    };

    locale.langs = ["abk", "ace", "ach", "ada", "ady", "ady", "aar", "afh",
            "afr", "afa", "ain", "aka", "akk", "alb", "sqi", "gsw", "ale", "alg",
            "gsw", "tut", "amh", "anp", "apa", "ara", "arg", "arp", "arw", "arm",
            "hye", "rup", "art", "rup", "asm", "ast", "ast", "ath", "aus", "map",
            "ava", "ave", "awa", "aym", "aze", "ast", "ban", "bat", "bal", "bam",
            "bai", "bad", "bnt", "bas", "bak", "baq", "eus", "btk", "bej", "bej",
            "bel", "bem", "ben", "ber", "bho", "bih", "bik", "byn", "bin", "bis",
            "byn", "zbl", "zbl", "zbl", "nob", "bos", "bra", "bre", "bug", "bul",
            "bua", "bur", "mya", "cad", "spa", "cat", "cau", "ceb", "cel", "cai",
            "khm", "chg", "cmc", "cha", "che", "chr", "nya", "chy", "chb", "nya",
            "chi", "zho", "chn", "chp", "cho", "zha", "chu", "chu", "chk", "chv",
            "nwc", "nwc", "syc", "rar", "cop", "cor", "cos", "cre", "mus", "crp",
            "cpe", "cpf", "cpp", "crh", "crh", "hrv", "cus", "cze", "ces", "dak",
            "dan", "dar", "del", "chp", "div", "zza", "zza", "din", "div", "doi",
            "dgr", "dra", "dua", "dut", "nld", "dum", "dyu", "dzo", "frs", "bin",
            "efi", "egy", "eka", "elx", "eng", "enm", "ang", "myv", "epo", "est",
            "ewe", "ewo", "fan", "fat", "fao", "fij", "fil", "fin", "fiu", "dut",
            "nld", "fon", "fre", "fra", "frm", "fro", "fur", "ful", "gaa", "gla",
            "car", "glg", "lug", "gay", "gba", "gez", "geo", "kat", "ger", "deu",
            "nds", "gmh", "goh", "gem", "kik", "gil", "gon", "gor", "got", "grb",
            "grc", "gre", "ell", "kal", "grn", "guj", "gwi", "hai", "hat", "hat",
            "hau", "haw", "heb", "her", "hil", "him", "hin", "hmo", "hit", "hmn",
            "hun", "hup", "iba", "ice", "isl", "ido", "ibo", "ijo", "ilo", "arc",
            "smn", "inc", "ine", "ind", "inh", "ina", "ile", "iku", "ipk", "ira",
            "gle", "mga", "sga", "iro", "ita", "jpn", "jav", "kac", "jrb", "jpr",
            "kbd", "kab", "kac", "kal", "xal", "kam", "kan", "kau", "pam", "kaa",
            "krc", "krl", "kar", "kas", "csb", "kaw", "kaz", "kha", "khi", "kho",
            "kik", "kmb", "kin", "zza", "kir", "zza", "tlh", "kom", "kon", "kok",
            "kor", "kos", "kpe", "kro", "kua", "kum", "kur", "kru", "kut", "kua",
            "kir", "lad", "lah", "lam", "day", "lao", "lat", "lav", "ast", "ltz",
            "lez", "lim", "lim", "lim", "lin", "lit", "jbo", "nds", "nds", "dsb",
            "loz", "lub", "lua", "lui", "smj", "lun", "luo", "lus", "ltz", "rup",
            "mac", "mkd", "mad", "mag", "mai", "mak", "mlg", "may", "msa", "mal",
            "div", "mlt", "mnc", "mdr", "man", "mni", "mno", "glv", "mao", "mri",
            "arn", "arn", "mar", "chm", "mah", "mwr", "mas", "myn", "men", "mic",
            "mic", "min", "mwl", "moh", "mdf", "rum", "ron", "rum", "ron", "mkh",
            "hmn", "lol", "mon", "mos", "mul", "mun", "nqo", "nah", "nau", "nav",
            "nav", "nde", "nbl", "ndo", "nap", "new", "nep", "new", "nia", "nic",
            "ssa", "niu", "zxx", "nog", "non", "nai", "nde", "frr", "sme", "nso",
            "nor", "nob", "nno", "zxx", "nub", "iii", "nym", "nya", "nyn", "nno",
            "nyo", "nzi", "ile", "oci", "pro", "arc", "xal", "oji", "chu", "chu",
            "nwc", "chu", "ori", "orm", "osa", "oss", "oss", "oto", "pal", "pau",
            "pli", "pam", "pag", "pan", "pap", "paa", "pus", "nso", "per", "fas",
            "peo", "phi", "phn", "fil", "pon", "pol", "por", "pra", "pro", "pan",
            "pus", "que", "raj", "rap", "rar", "qaa-qtz", "roa", "rum", "ron",
            "roh", "rom", "run", "rus", "kho", "sal", "sam", "smi", "smo", "sad",
            "sag", "san", "sat", "srd", "sas", "nds", "sco", "gla", "sel", "sem",
            "nso", "srp", "srr", "shn", "sna", "iii", "scn", "sid", "sgn", "bla",
            "snd", "sin", "sin", "sit", "sio", "sms", "den", "sla", "slo", "slk",
            "slv", "sog", "som", "son", "snk", "wen", "nso", "sot", "sai", "nbl",
            "alt", "sma", "spa", "srn", "zgh", "suk", "sux", "sun", "sus", "swa",
            "ssw", "swe", "gsw", "syr", "tgl", "tah", "tai", "tgk", "tmh", "tam",
            "tat", "tel", "ter", "tet", "tha", "tib", "bod", "tig", "tir", "tem",
            "tiv", "tlh", "tli", "tpi", "tkl", "tog", "ton", "tsi", "tso", "tsn",
            "tum", "tup", "tur", "ota", "tuk", "tvl", "tyv", "twi", "udm", "uga",
            "uig", "ukr", "umb", "mis", "und", "hsb", "urd", "uig", "uzb", "vai",
            "cat", "ven", "vie", "vol", "vot", "wak", "wln", "war", "was", "wel",
            "cym", "fry", "him", "wal", "wal", "wol", "xho", "sah", "yao", "yap",
            "yid", "yor", "ypk", "znd", "zap", "zza", "zza", "zen", "zha", "zul",
            "zun"
    ];

    function showCurrentLocale() {
        var newLocale = tizen.locale.getLocale();

        jQuery("#curLocale").html(newLocale);
    }

    function loadLocaleList(pageNum, searchText) {
        var i, count, pageCount, languages = [],
            temps = [],
            index = 0;

        count = locale.ROWCOUNT * locale.COLCOUNT;
        if (searchText) {
            for (i = 0; i < locale.langs.length; i++) {
                if (locale.langs[i].indexOf(searchText) > -1) {
                    languages.push(locale.langs[i]);
                }
            }
            locale.search = searchText;
        } else {
            languages = languages.concat(locale.langs);
        }

        pageCount = Math.ceil(languages.length / count);
        for (i = 1; i <= locale.pageCount; i++) {
        	jQuery("#page" + i).css( "background", "" );
            if (i <= pageCount) {
                jQuery("#page" + i).show();
            }
            else {
                jQuery("#page" + i).hide();
            }
        }

        i = (pageNum - 1) * count;
        for (; i < count + ((pageNum - 1) * count); i++) {
            if (!languages[i]) break;
            if (index % locale.COLCOUNT === 0) {
                temps.push("</tr><tr>");
            }
            temps.push("<td>" + languages[i] + "</td>");
            index++;
        }
        temps.splice(0, 1);
        jQuery("#localeList").html("<tr>" + temps.join("") + "</tr>");
        jQuery("#page" + pageNum).css( "background", "#BDB9B4" );

        bindLocaleList();
    }

    function setNewLocale(newLocale) {
        if (newLocale === tizen.locale.getLocale()) {
            jQuery("#info").html("Not set same locale.");
            return;
        }

        tizen.locale.setLocale(newLocale);
    }

    function localeCallback(newLocale) {
        jQuery("#info").html("Set new locale successfully.");
        showCurrentLocale();
    }

    function bindLocaleList() {
        jQuery("#localeList td").bind("click", function(event) {
            var newLocale = jQuery(this).html();
            setNewLocale(newLocale);

            event.preventDefault();
        });
    }

    jQuery(document).ready(function() {
        showCurrentLocale();
        loadLocaleList(locale.pageNow, "");

        tizen.locale.localeChanged(localeCallback);

        jQuery("#pageNum a").bind("click", function(event) {
            var next = jQuery(this).attr("id");

            next = Number(next.replace("page", ""));
            if (next !== locale.pageNow) {
                locale.pageNow = next;
                loadLocaleList(next, locale.search);
            }

            event.preventDefault();
        });

        jQuery("#pageOperation a").bind("click", function(event) {
            var op = jQuery(this).attr("id");
            if (op === "prev") {
                locale.pageNow = (locale.pageNow > 1) ? --locale.pageNow : 1;
                loadLocaleList(locale.pageNow, locale.search);
            } else {
                locale.pageNow = (locale.pageNow < locale.pageCount) ? ++locale.pageNow : locale.pageCount;
                loadLocaleList(locale.pageNow, locale.search);
            }

            event.preventDefault();
        });

        jQuery("#search").bind("keyup", function(event) {
            var search = jQuery(this).val();
            loadLocaleList(1, search);

            event.preventDefault();
        });

        // add eventListener for tizenhwkey
        document.addEventListener('tizenhwkey', function(e) {
            if (e.keyName == "back")
                tizen.application.getCurrentApplication().exit();
        });
    });
})();