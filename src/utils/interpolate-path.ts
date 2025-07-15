export const interpolatePath = (
    path1: string,
    path2: string,
    progress: number
  ): string => {
    // Extract numbers from both paths
    const nums1 = path1.match(/-?\d+(?:\.\d+)?/g)?.map(Number) || [];
    const nums2 = path2.match(/-?\d+(?:\.\d+)?/g)?.map(Number) || [];
  
    // Ensure both arrays have the same length by padding with zeros
    const maxLength = Math.max(nums1.length, nums2.length);
    while (nums1.length < maxLength) nums1.push(0);
    while (nums2.length < maxLength) nums2.push(0);
  
    // Interpolate between the numbers
    const interpolatedNums = nums1.map((num1, i) => {
      const num2 = nums2[i] || 0;
      return num1 + (num2 - num1) * progress;
    });
  
    // Reconstruct the path with interpolated numbers
    let result = path1;
    let numIndex = 0;
    result = result.replace(/-?\d+(?:\.\d+)?/g, () => {
      return interpolatedNums[numIndex++]?.toFixed(3) || "0";
    });
  
    return result;
  };