const calculateScore = require('./calculateScore')

const findAddress = text => {
    const lines = text.split('\n').map(line => line.trim()); // Split text into lines and trim spaces
    let result = ''; // Initialize result string
    let capture = false; // Start capturing flag

    for (const line of lines) {
        if (line.startsWith('4.')) {
            capture = true; // Start capturing after "4."
            result += line.replace('4.', '').trim() + ' '; // Add the first line (remove "4.")
        } else if (line.includes('5.')) {
            capture = false; // Stop capturing if the line includes "5."
            break;
        } else if (capture) {
            result += line + ' '; // Append subsequent lines
        }
    }

    return result.trim(); // Return the final trimmed address
};

const findValidity = text => {
    const matches = text.match(/\d{2}-\d{2}-\d{4}/g); // Find all date-like patterns
    return matches ? matches[matches.length - 1] : null; // Return the last match
};

const refineData = data => {
    try {
        return {
            ...data,
            address: findAddress(text)
        }
    } catch (err) {
        return data
    }
}

module.exports = text => {
    const data = {
        type: 'SIM',
        name: text.match(/1\.\s*(.*)/)?.[1]?.trim(), // Line starting with "1."
        dob: text.match(/2\.\s*(.*)/)?.[1]?.trim(), // Line starting with "2."
        bloodType: text.match(/3\.\s*(.*)/)?.[1]?.split('-')[0]?.trim(), // Line starting with "3." (before "-")
        gender: text.match(/3\.\s*(.*)/)?.[1]?.split('-')[1]?.trim(), // Line starting with "3." (after "-")
        address: text.match(/4\.\s*(.*)/)?.[1]?.trim(), // Line starting with "4."
        job: text.match(/5\.\s*(.*)/)?.[1]?.trim(), // Line starting with "5."
        placeOfIssue: text.match(/6\.\s*(.*)/)?.[1]?.trim().split(/\s/)[0],
        validUntil: findValidity(text), // Line starting with "6."
        licenseNumber: text.match(/[\w$]{4}-[\w$]{4}-[\w$]{6}/)?.[0]?.trim(), // License number pattern
    };

    const result = refineData(data)

    return {
        score: calculateScore(result),
        data: result
    }
}
