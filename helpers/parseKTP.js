module.exports = text => {
    return {
        provinsi: text.match(/PROVINSI\s+(.*)/i)?.[1]?.trim(),
        kota: text.match(/JAKARTA\s+BARAT/i)?.[0]?.trim(),
        nik: text.match(/NIK\s*:\s*([\d]+)/i)?.[1]?.trim(),
        nama: text.match(/Nama\s*:\s*(.*)/i)?.[1]?.trim(),
        tempatTanggalLahir: text
            .match(/Tempat\/Tgl Lahir\s*:\s*(.*)/i)?.[1]
            ?.trim(),
        jenisKelamin: text.match(/Jenis Kelamin\s*:\s*(\w+)/i)?.[1]?.trim(),
        golDarah: text.match(/Gol\. Darah\s*:\s*(\w+)/i)?.[1]?.trim(),
        alamat: text.match(/Alamat\s*:\s*(.*)/i)?.[1]?.trim(),
        rtRw: text.match(/RT\/RW\s*:\s*([\d\/]+)/i)?.[1]?.trim(),
        kelDesa: text.match(/Kel\/Desa\s*:\s*(.*)/i)?.[1]?.trim(),
        kecamatan: text.match(/Kecamatan\s*:\s*(.*)/i)?.[1]?.trim(),
        agama: text.match(/Agama\s*:\s*(.*)/i)?.[1]?.trim(),
        statusPerkawinan: text
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
};