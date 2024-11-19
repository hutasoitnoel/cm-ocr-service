const calculateScore = require('./calculateScore')

const refineData = data => {
    return {
        ...data,
        religion: data.religion?.split(/\s/)[0] || data.religion,
        marital_status: data.marital_status?.split(/\s/)[0] || data.marital_status,
        sub_district: data.sub_district?.split(/\s/)[0] || data.sub_district,
        district: data.district?.split(/\s/)[0] || data.district,
        citizenship: data.citizenship?.split(/\s/)[0] || data.citizenship,
        expiration_date: data.expiration_date?.split(/\s/)[0] || data.expiration_date
    };
}

module.exports = text => {
    const data = {
        type: 'KTP',
        province: text.match(/PROVINSI\s+(.*)/i)?.[1]?.trim(),
        city: text.match(/JAKARTA\s+BARAT/i)?.[0]?.trim(),
        id_number: text.match(/NIK\s*:\s*([\d]+)/i)?.[1]?.trim(),
        name: text.match(/Nama\s*:\s*(.*)/i)?.[1]?.trim(),
        dob: text.match(/Tempat.*:\s*(.*)/i)?.[1]?.trim(),
        gender: text.match(/Jenis Kelamin\s*:\s*(\w+)/i)?.[1]?.trim(),
        blood_type: text.match(/Gol\. Darah\s*:\s*(\w+)/i)?.[1]?.trim(),
        address: text.match(/Alamat\s*:\s*(.*)/i)?.[1]?.trim(),
        rt_rw: text.match(/RTRW\s*:\s*([\d\/]+)/i)?.[1]?.trim(),
        sub_district: text.match(/(?:KeliDesa.*?:|Kel\/Desa\s*:\s*)(.*)/i)?.[1]?.trim(),
        district: text.match(/Kecamatan\s*:\s*(.*)/i)?.[1]?.trim(),
        religion: text.match(/Agama\s*:\s*(.*)/i)?.[1]?.trim(),
        marital_status: text
            .match(/Status Perkawinan\s*:\s*(.*)/i)?.[1]
            ?.trim(),
        occupation: text.match(/Pekerjaan\s*:\s*(.*)/i)?.[1]?.trim(),
        citizenship: text
            .match(/Kewarganegaraan\s*:\s*(.*)/i)?.[1]
            ?.trim(),
        expiration_date: text
            .match(/Berlaku Hingga\s*:\s*(.*)/i)?.[1]
            ?.trim(),
    }

    const result = refineData(data)

    return {
        score: calculateScore(result),
        data: result
    }
};