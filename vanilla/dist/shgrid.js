function t() {}
function e(t) {
	return t();
}
function n() {
	return Object.create(null);
}
function o(t) {
	t.forEach(e);
}
function r(t) {
	return 'function' == typeof t;
}
function l(t, e) {
	return t != t ? e == e : t !== e || (t && 'object' == typeof t) || 'function' == typeof t;
}
function c(t, e) {
	t.appendChild(e);
}
function i(t, e, n) {
	t.insertBefore(e, n || null);
}
function u(t) {
	t.parentNode && t.parentNode.removeChild(t);
}
function s(t, e) {
	for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
}
function a(t) {
	return document.createElement(t);
}
function d(t) {
	return document.createElementNS('http://www.w3.org/2000/svg', t);
}
function f(t) {
	return document.createTextNode(t);
}
function h() {
	return f(' ');
}
function p(t, e, n, o) {
	return t.addEventListener(e, n, o), () => t.removeEventListener(e, n, o);
}
function g(t, e, n) {
	null == n ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function m(t, e) {
	(e = '' + e), t.data !== e && (t.data = e);
}
function $(t, e, n) {
	t.classList[n ? 'add' : 'remove'](e);
}
let v;
function b(t) {
	v = t;
}
function k(t) {
	(function () {
		if (!v) throw new Error('Function called outside component initialization');
		return v;
	})().$$.on_mount.push(t);
}
new Set(), new Map();
const y = [],
	w = [];
let x = [];
const _ = [],
	E = Promise.resolve();
let L = !1;
function A(t) {
	x.push(t);
}
const S = new Set();
let M = 0;
function N() {
	if (0 !== M) return;
	const t = v;
	do {
		try {
			for (; M < y.length; ) {
				const t = y[M];
				M++, b(t), D(t.$$);
			}
		} catch (t) {
			throw ((y.length = 0), (M = 0), t);
		}
		for (b(null), y.length = 0, M = 0; w.length; ) w.pop()();
		for (let t = 0; t < x.length; t += 1) {
			const e = x[t];
			S.has(e) || (S.add(e), e());
		}
		x.length = 0;
	} while (y.length);
	for (; _.length; ) _.pop()();
	(L = !1), S.clear(), b(t);
}
function D(t) {
	if (null !== t.fragment) {
		t.update(), o(t.before_update);
		const e = t.dirty;
		(t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(A);
	}
}
const C = new Set();
let I;
function O(t, e) {
	t && t.i && (C.delete(t), t.i(e));
}
function j(t, e, n, o) {
	if (t && t.o) {
		if (C.has(t)) return;
		C.add(t),
			I.c.push(() => {
				C.delete(t), o && (n && t.d(1), o());
			}),
			t.o(e);
	} else o && o();
}
function q(t, n, l, c) {
	const { fragment: i, after_update: u } = t.$$;
	i && i.m(n, l),
		c ||
			A(() => {
				const n = t.$$.on_mount.map(e).filter(r);
				t.$$.on_destroy ? t.$$.on_destroy.push(...n) : o(n), (t.$$.on_mount = []);
			}),
		u.forEach(A);
}
function B(t, e) {
	const n = t.$$;
	null !== n.fragment &&
		(!(function (t) {
			const e = [],
				n = [];
			x.forEach(o => (-1 === t.indexOf(o) ? e.push(o) : n.push(o))), n.forEach(t => t()), (x = e);
		})(n.after_update),
		o(n.on_destroy),
		n.fragment && n.fragment.d(e),
		(n.on_destroy = n.fragment = null),
		(n.ctx = []));
}
function P(t, e) {
	-1 === t.$$.dirty[0] && (y.push(t), L || ((L = !0), E.then(N)), t.$$.dirty.fill(0)),
		(t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function T(e, r, l, c, i, s, a, d = [-1]) {
	const f = v;
	b(e);
	const h = (e.$$ = {
		fragment: null,
		ctx: [],
		props: s,
		update: t,
		not_equal: i,
		bound: n(),
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(r.context || (f ? f.$$.context : [])),
		callbacks: n(),
		dirty: d,
		skip_bound: !1,
		root: r.target || f.$$.root,
	});
	a && a(h.root);
	let p = !1;
	if (
		((h.ctx = l
			? l(e, r.props || {}, (t, n, ...o) => {
					const r = o.length ? o[0] : n;
					return (
						h.ctx &&
							i(h.ctx[t], (h.ctx[t] = r)) &&
							(!h.skip_bound && h.bound[t] && h.bound[t](r), p && P(e, t)),
						n
					);
			  })
			: []),
		h.update(),
		(p = !0),
		o(h.before_update),
		(h.fragment = !!c && c(h.ctx)),
		r.target)
	) {
		if (r.hydrate) {
			const t = (function (t) {
				return Array.from(t.childNodes);
			})(r.target);
			h.fragment && h.fragment.l(t), t.forEach(u);
		} else h.fragment && h.fragment.c();
		r.intro && O(e.$$.fragment), q(e, r.target, r.anchor, r.customElement), N();
	}
	b(f);
}
new Set([
	'allowfullscreen',
	'allowpaymentrequest',
	'async',
	'autofocus',
	'autoplay',
	'checked',
	'controls',
	'default',
	'defer',
	'disabled',
	'formnovalidate',
	'hidden',
	'inert',
	'ismap',
	'loop',
	'multiple',
	'muted',
	'nomodule',
	'novalidate',
	'open',
	'playsinline',
	'readonly',
	'required',
	'reversed',
	'selected',
]);
class z {
	$destroy() {
		B(this, 1), (this.$destroy = t);
	}
	$on(e, n) {
		if (!r(n)) return t;
		const o = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
		return (
			o.push(n),
			() => {
				const t = o.indexOf(n);
				-1 !== t && o.splice(t, 1);
			}
		);
	}
	$set(t) {
		var e;
		this.$$set &&
			((e = t), 0 !== Object.keys(e).length) &&
			((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
	}
}
function F(e) {
	let n;
	return {
		c() {
			(n = a('div')),
				(n.innerHTML =
					'<div class="svelte-rkk14u"></div> \n\t<div class="svelte-rkk14u"></div> \n\t<div class="svelte-rkk14u"></div> \n\t<div class="svelte-rkk14u"></div> \n\t<div class="svelte-rkk14u"></div> \n\t<div class="svelte-rkk14u"></div> \n\t<div class="svelte-rkk14u"></div> \n\t<div class="svelte-rkk14u"></div>'),
				g(n, 'class', 'lds-roller svelte-rkk14u');
		},
		m(t, e) {
			i(t, n, e);
		},
		p: t,
		i: t,
		o: t,
		d(t) {
			t && u(n);
		},
	};
}
class G extends z {
	constructor(t) {
		super(), T(this, t, null, F, l, {});
	}
}
function H(t, e, n) {
	const o = t.slice();
	return (o[6] = e[n]), (o[8] = n), o;
}
function Z(t, e, n) {
	const o = t.slice();
	return (o[9] = e[n]), (o[8] = n), o;
}
function J(t, e, n) {
	const o = t.slice();
	return (o[11] = e[n]), o;
}
function K(t, e, n) {
	const o = t.slice();
	return (o[14] = e[n]), (o[15] = e), (o[16] = n), o;
}
function Q(t) {
	let e,
		n,
		r,
		l,
		s,
		v,
		b,
		k,
		y,
		w,
		x,
		_,
		E,
		L,
		A,
		S = t[14].label + '',
		M = t[0].sorter?.isAsc ? 'Sort Descending' : 'Sort Ascending';
	function N() {
		return t[1](t[14]);
	}
	function D(...e) {
		return t[2](t[14], t[15], t[16], ...e);
	}
	return {
		c() {
			(e = a('th')),
				(n = a('label')),
				(r = a('p')),
				(l = f(S)),
				(s = h()),
				(v = a('button')),
				(b = d('svg')),
				(k = d('title')),
				(y = f(M)),
				(w = d('path')),
				(x = h()),
				(_ = a('input')),
				(E = h()),
				g(w, 'd', 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z'),
				g(b, 'xmlns', 'http://www.w3.org/2000/svg'),
				g(b, 'viewBox', '0 0 24 24'),
				g(v, 'class', 'icon'),
				$(v, 'hidden-till-hover', t[0].sorter?.columnId !== t[14].id),
				$(v, 'rotate', t[0].sorter?.columnId === t[14].id && !t[0].sorter?.isAsc),
				g(_, 'type', 'text'),
				g(n, 'class', 'container');
		},
		m(t, o) {
			i(t, e, o),
				c(e, n),
				c(n, r),
				c(r, l),
				c(n, s),
				c(n, v),
				c(v, b),
				c(b, k),
				c(k, y),
				c(b, w),
				c(n, x),
				c(n, _),
				c(e, E),
				L || ((A = [p(v, 'click', N), p(_, 'input', D)]), (L = !0));
		},
		p(e, n) {
			(t = e),
				1 & n && S !== (S = t[14].label + '') && m(l, S),
				1 & n && M !== (M = t[0].sorter?.isAsc ? 'Sort Descending' : 'Sort Ascending') && m(y, M),
				1 & n && $(v, 'hidden-till-hover', t[0].sorter?.columnId !== t[14].id),
				1 & n && $(v, 'rotate', t[0].sorter?.columnId === t[14].id && !t[0].sorter?.isAsc);
		},
		d(t) {
			t && u(e), (L = !1), o(A);
		},
	};
}
function R(e) {
	let n,
		o = e[0].data,
		r = [];
	for (let t = 0; t < o.length; t += 1) r[t] = W(Z(e, o, t));
	return {
		c() {
			for (let t = 0; t < r.length; t += 1) r[t].c();
			n = f('');
		},
		m(t, e) {
			for (let n = 0; n < r.length; n += 1) r[n] && r[n].m(t, e);
			i(t, n, e);
		},
		p(t, e) {
			if (1 & e) {
				let l;
				for (o = t[0].data, l = 0; l < o.length; l += 1) {
					const c = Z(t, o, l);
					r[l] ? r[l].p(c, e) : ((r[l] = W(c)), r[l].c(), r[l].m(n.parentNode, n));
				}
				for (; l < r.length; l += 1) r[l].d(1);
				r.length = o.length;
			}
		},
		i: t,
		o: t,
		d(t) {
			s(r, t), t && u(n);
		},
	};
}
function U(e) {
	let n, o, r, l;
	return (
		(r = new G({})),
		{
			c() {
				var t;
				(n = a('tr')), (o = a('td')), (t = r.$$.fragment) && t.c(), g(o, 'colspan', '999');
			},
			m(t, e) {
				i(t, n, e), c(n, o), q(r, o, null), (l = !0);
			},
			p: t,
			i(t) {
				l || (O(r.$$.fragment, t), (l = !0));
			},
			o(t) {
				j(r.$$.fragment, t), (l = !1);
			},
			d(t) {
				t && u(n), B(r);
			},
		}
	);
}
function V(t) {
	let e,
		n,
		o = t[11] + '';
	return {
		c() {
			(e = a('td')), (n = f(o));
		},
		m(t, o) {
			i(t, e, o), c(e, n);
		},
		p(t, e) {
			1 & e && o !== (o = t[11] + '') && m(n, o);
		},
		d(t) {
			t && u(e);
		},
	};
}
function W(t) {
	let e,
		n,
		o = t[9],
		r = [];
	for (let e = 0; e < o.length; e += 1) r[e] = V(J(t, o, e));
	return {
		c() {
			e = a('tr');
			for (let t = 0; t < r.length; t += 1) r[t].c();
			(n = h()), $(e, 'odd-darker', t[8] % 2);
		},
		m(t, o) {
			i(t, e, o);
			for (let t = 0; t < r.length; t += 1) r[t] && r[t].m(e, null);
			c(e, n);
		},
		p(t, l) {
			if (1 & l) {
				let c;
				for (o = t[9], c = 0; c < o.length; c += 1) {
					const i = J(t, o, c);
					r[c] ? r[c].p(i, l) : ((r[c] = V(i)), r[c].c(), r[c].m(e, n));
				}
				for (; c < r.length; c += 1) r[c].d(1);
				r.length = o.length;
			}
		},
		d(t) {
			t && u(e), s(r, t);
		},
	};
}
function X(t) {
	let e,
		n,
		o,
		r,
		l = t[8] + 1 + '';
	function s() {
		return t[3](t[8]);
	}
	return {
		c() {
			(e = a('button')), (n = f(l));
		},
		m(t, l) {
			i(t, e, l), c(e, n), o || ((r = p(e, 'click', s)), (o = !0));
		},
		p(e, n) {
			t = e;
		},
		d(t) {
			t && u(e), (o = !1), r();
		},
	};
}
function Y(t) {
	let e,
		n,
		r,
		l,
		d,
		$,
		v,
		b,
		k,
		y,
		w,
		x,
		_,
		E,
		L,
		A,
		S,
		M,
		N,
		D,
		C,
		q,
		B,
		P,
		T,
		z = t[0].paginator.page + '',
		F = Math.ceil(t[0].count / t[0].paginator.limit) + '',
		G = t[0].count + '',
		Z = t[0].columns,
		J = [];
	for (let e = 0; e < Z.length; e += 1) J[e] = Q(K(t, Z, e));
	const V = [U, R],
		W = [];
	function Y(t, e) {
		return t[0].loading ? 0 : 1;
	}
	(b = Y(t)), (k = W[b] = V[b](t));
	let tt = { length: Math.ceil(t[0].count / t[0].paginator.limit) },
		et = [];
	for (let e = 0; e < tt.length; e += 1) et[e] = X(H(t, tt, e));
	return {
		c() {
			(e = a('div')), (n = a('div')), (r = a('table')), (l = a('thead')), (d = a('tr'));
			for (let t = 0; t < J.length; t += 1) J[t].c();
			($ = h()),
				(v = a('tbody')),
				k.c(),
				(y = h()),
				(w = a('div')),
				(x = a('p')),
				(_ = f(z)),
				(E = f(' of ')),
				(L = f(F)),
				(A = h());
			for (let t = 0; t < et.length; t += 1) et[t].c();
			(S = h()),
				(M = a('button')),
				(M.textContent = 'Build Grid'),
				(N = h()),
				(D = a('p')),
				(C = f(G)),
				(q = f(' records in total')),
				g(n, 'class', 'flex'),
				g(w, 'class', 'pagination'),
				g(e, 'class', 'shgrid');
		},
		m(o, u) {
			i(o, e, u), c(e, n), c(n, r), c(r, l), c(l, d);
			for (let t = 0; t < J.length; t += 1) J[t] && J[t].m(d, null);
			c(r, $), c(r, v), W[b].m(v, null), c(e, y), c(e, w), c(w, x), c(x, _), c(x, E), c(x, L), c(w, A);
			for (let t = 0; t < et.length; t += 1) et[t] && et[t].m(w, null);
			c(w, S), c(w, M), c(w, N), c(w, D), c(D, C), c(D, q), (B = !0), P || ((T = p(M, 'click', t[4])), (P = !0));
		},
		p(t, [e]) {
			if (1 & e) {
				let n;
				for (Z = t[0].columns, n = 0; n < Z.length; n += 1) {
					const o = K(t, Z, n);
					J[n] ? J[n].p(o, e) : ((J[n] = Q(o)), J[n].c(), J[n].m(d, null));
				}
				for (; n < J.length; n += 1) J[n].d(1);
				J.length = Z.length;
			}
			let n = b;
			if (
				((b = Y(t)),
				b === n
					? W[b].p(t, e)
					: ((I = { r: 0, c: [], p: I }),
					  j(W[n], 1, 1, () => {
							W[n] = null;
					  }),
					  I.r || o(I.c),
					  (I = I.p),
					  (k = W[b]),
					  k ? k.p(t, e) : ((k = W[b] = V[b](t)), k.c()),
					  O(k, 1),
					  k.m(v, null)),
				(!B || 1 & e) && z !== (z = t[0].paginator.page + '') && m(_, z),
				(!B || 1 & e) && F !== (F = Math.ceil(t[0].count / t[0].paginator.limit) + '') && m(L, F),
				1 & e)
			) {
				let n;
				for (tt = { length: Math.ceil(t[0].count / t[0].paginator.limit) }, n = 0; n < tt.length; n += 1) {
					const o = H(t, tt, n);
					et[n] ? et[n].p(o, e) : ((et[n] = X(o)), et[n].c(), et[n].m(w, S));
				}
				for (; n < et.length; n += 1) et[n].d(1);
				et.length = tt.length;
			}
			(!B || 1 & e) && G !== (G = t[0].count + '') && m(C, G);
		},
		i(t) {
			B || (O(k), (B = !0));
		},
		o(t) {
			j(k), (B = !1);
		},
		d(t) {
			t && u(e), s(J, t), W[b].d(), s(et, t), (P = !1), T();
		},
	};
}
function tt(t, e, n) {
	let { builder: o } = e;
	o.setListener(() => {
		console.log('build'), n(0, o);
	}),
		k(() => o.buildData());
	return (
		(t.$$set = t => {
			'builder' in t && n(0, (o = t.builder));
		}),
		[
			o,
			t => o.sortColumn(t.id),
			(t, e, r, l) => {
				n(0, (e[r].filter = l.target.value), o), o.buildData();
			},
			t => o.setPage(t + 1),
			() => o.buildData(),
		]
	);
}
class et extends z {
	constructor(t) {
		super(), T(this, t, tt, Y, l, { builder: 0 });
	}
}
export { et as default };
//# sourceMappingURL=shgrid.js.map
