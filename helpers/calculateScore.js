module.exports = data => {
    const totalFields = Object.keys(data).length; // Total number of fields
    const filledFields = Object.values(data).filter(value => value !== undefined && value !== null && value !== '').length; // Count non-empty fields

    const score = (filledFields / totalFields) * 100; // Calculate percentage
    return Number(score.toFixed(0)); // Return score rounded to 0 decimal places
};
