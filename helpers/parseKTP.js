const calculateScore = require('./calculateScore')

const refineData = data => {
    try {
        return {
            ...data,
            religion: data.religion.split(/\s/)[0],
            maritalStatus: data.maritalStatus.split(/\s/)[0],
            subDistrict: data.subDistrict.split(/\s/)[0],
            district: data.district.split(/\s/)[0],
            citizenship: data.citizenship.split(/\s/)[0],
            validity: data.validity.split(/\s/)[0]
        }
    } catch (err) {
        return data
    }
}

module.exports = text => {
    const data = {
        type: 'KTP',
        province: text.match(/PROVINSI\s+(.*)/i)?.[1]?.trim(),
        city: text.match(/JAKARTA\s+BARAT/i)?.[0]?.trim(),
        nationalId: text.match(/NIK\s*:\s*([\d]+)/i)?.[1]?.trim(),
        name: text.match(/Nama\s*:\s*(.*)/i)?.[1]?.trim(),
        placeAndDateOfBirth: text.match(/Tempat.*:\s*(.*)/i)?.[1]?.trim(),
        gender: text.match(/Jenis Kelamin\s*:\s*(\w+)/i)?.[1]?.trim(),
        bloodType: text.match(/Gol\. Darah\s*:\s*(\w+)/i)?.[1]?.trim(),
        address: text.match(/Alamat\s*:\s*(.*)/i)?.[1]?.trim(),
        rtrw: text.match(/RTRW\s*:\s*([\d\/]+)/i)?.[1]?.trim(),
        subDistrict: text.match(/(?:KeliDesa.*?:|Kel\/Desa\s*:\s*)(.*)/i)?.[1]?.trim(),
        district: text.match(/Kecamatan\s*:\s*(.*)/i)?.[1]?.trim(),
        religion: text.match(/Agama\s*:\s*(.*)/i)?.[1]?.trim(),
        maritalStatus: text
            .match(/Status Perkawinan\s*:\s*(.*)/i)?.[1]
            ?.trim(),
        occupation: text.match(/Pekerjaan\s*:\s*(.*)/i)?.[1]?.trim(),
        citizenship: text
            .match(/Kewarganegaraan\s*:\s*(.*)/i)?.[1]
            ?.trim(),
        validity: text
            .match(/Berlaku Hingga\s*:\s*(.*)/i)?.[1]
            ?.trim(),
    }

    const result = refineData(data)

    return {
        score: calculateScore(result),
        data: result
    }
};