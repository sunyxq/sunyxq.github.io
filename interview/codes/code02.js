function revertStr(str) {
  return str.replace(/a-zA-z/g, (content) =>
    content.toUpperCase() === content
      ? content.toLowerCase()
      : content.toUpperCase()
  );
}

const data1 = {
  filterList: [
    {
      conditions: [
        {
          key: "WECHAT",
        },
      ],
    },
  ],
};

data1 = _.set({}, "filterList[0]", { key: "wechat" });
data2 = _.set({}, "filterList[1]", { value: "微信" });

let form = {
  filterList: [
    {
      conditions: [
        {
          itemKey: "AUDIENCE_USER_ID",
          classifyKey: "BASE_PROP",
        },
      ],
    },
  ],
};
let newForm = _.set({}, "filterList[0].conditions[0]", { itemName: "客户ID" });
_.merge({}, form, newForm);

const data2 = {
  filterList: [
    {
      conditions: [
        ,
        {
          key: "WECHAT",
        },
      ],
    },
  ],
};

function du(n) {
  var t = typeof n;
  return null != n && ("object" == t || "function" == t);
}

function Sr(n, t) {
  return ff(n) ? n : Ie(n, t) ? [n] : jo(Iu(n));
}

function lr(n, t, r, e) {
  if (!du(n)) return n;
  t = Sr(t, n);
  for (var u = -1, i = t.length, o = i - 1, f = n; null != f && ++u < i; ) {
    var c = Me(t[u]),
      a = r;
    if (u != o) {
      var l = f[c],
        a = e ? e(l, c, f) : T;
      a === T && (a = du(l) ? l : Se(t[u + 1]) ? [] : {});
    }
    ot(f, c, a), (f = f[c]);
  }
  return n;
}

let c = {
  filters: [
    {
      conditions: [
        {
          name: "vue",
          time: "today",
        },
      ],
    },
  ],
};

let d = {
  filters: [
    {
      conditions: {
        vue: {
          name: "vue",
          time: "today",
        },
      },
    },
  ],
};
