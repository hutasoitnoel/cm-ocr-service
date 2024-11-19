module.exports = text => {
    let result = {
        provinsi: text.match(/PROVINSI\s+(.*)/i)?.[1]?.trim(),
        kota: text.match(/JAKARTA\s+BARAT/i)?.[0]?.trim(),
        nik: text.match(/NIK\s*:\s*([\d]+)/i)?.[1]?.trim(),
        nama: text.match(/Nama\s*:\s*(.*)/i)?.[1]?.trim(),
        ttl: text.match(/Tempat.*:\s*(.*)/i)?.[1]?.trim(),
        kelamin: text.match(/Jenis Kelamin\s*:\s*(\w+)/i)?.[1]?.trim(),
        darah: text.match(/Gol\. Darah\s*:\s*(\w+)/i)?.[1]?.trim(),
        alamat: text.match(/Alamat\s*:\s*(.*)/i)?.[1]?.trim(),
        rtrw: text.match(/RTRW\s*:\s*([\d\/]+)/i)?.[1]?.trim(),
        kelurahan: text.match(/(?:KeliDesa.*?:|Kel\/Desa\s*:\s*)(.*)/i)?.[1]?.trim(),
        kecamatan: text.match(/Kecamatan\s*:\s*(.*)/i)?.[1]?.trim(),
        agama: text.match(/Agama\s*:\s*(.*)/i)?.[1]?.trim(),
        statusKawin: text
            .match(/Status Perkawinan\s*:\s*(.*)/i)?.[1]
            ?.trim(),
        pekerjaan: text.match(/Pekerjaan\s*:\s*(.*)/i)?.[1]?.trim(),
        kewarganegaraan: text
            .match(/Kewarganegaraan\s*:\s*(.*)/i)?.[1]
            ?.trim(),
        berlakuHingga: text
            .match(/Berlaku Hingga\s*:\s*(.*)/i)?.[1]
            ?.trim(),
    }

    result.agama = result.agama.split(/\s/)[0]
    result.statusKawin = result.statusKawin.split(/\s/)[0]
    result.kelurahan = result.kelurahan.split(/\s/)[0]
    result.kecamatan = result.kecamatan.split(/\s/)[0]
    result.kewarganegaraan = result.kewarganegaraan.split(/\s/)[0]
    result.berlakuHingga = result.berlakuHingga.split(/\s/)[0]

    return result
};