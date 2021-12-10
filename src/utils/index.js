export const pick = (o, fields) => {
	return fields.reduce((a, x) => {
		if (Object.prototype.hasOwnProperty.call(o, x)) a[x] = o[x];
		return a;
	}, {});
};