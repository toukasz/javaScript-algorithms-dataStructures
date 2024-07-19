var findMedianSortedArrays = function(nums1, nums2) {
	let merged = [];
	let a = 0;
	let b = 0;
	let index = 0;
	while (a < nums1.length || b < nums2.length) {
		if (a === nums1.length && b < nums2.length) {
			merged = [...merged, ...nums2.slice(b)];
			b = nums2.length;
		}
		if (b === nums2.length && a < nums1.length) {
			merged = [...merged, ...nums1.slice(a)];
			a = nums1.length;
		}
		if (nums1[a] < nums2[b]) {
			merged.push(nums1[a]);
			a++;
		}
		if (nums2[b] < nums1[a]) {
			merged.push(nums2[b]);
			b++;
		}
		index++;
	}

	let center = merged.length / 2;
	return (merged.length % 2 === 0)
		? (merged[center - 1] + merged[center]) / 2
		: merged[Math.floor(center)];
};

/*
var findMedianSortedArrays = function(nums1, nums2) {
	let merged = [];
	let a = 0;
	let b = 0;
	let index = 0;
	while (a < nums1.length || b < nums2.length) {
		if (a === nums1.length && b < nums2.length) {
			merged = [...merged, ...nums2.slice(b)];
			b = nums2.length;
		}
		if (b === nums2.length && a < nums1.length) {
			merged = [...merged, ...nums1.slice(a)];
			a = nums1.length;
		}
		if (nums1[a] < nums2[b]) {
			merged.push(nums1[a]);
			a++;
		}
		if (nums2[b] <= nums1[a]) {
			merged.push(nums2[b]);
			b++;
		}
		index++;
	}

	let center = merged.length / 2;
	return (merged.length % 2 === 0)
		? (merged[center - 1] + merged[center]) / 2
		: merged[Math.floor(center)];
};
*/

const nums2 = [1,3];
const nums1 = [2,4,5,6];

console.log(findMedianSortedArrays(nums1, nums2));
