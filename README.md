# test-msn

## how to use
1. command "git clone" to your chosen directory
2. open folder with code editor (ex: vsc)
3. command "cd server" / "cd client", then "npm install"
4. adjust config/config.json your computer setting
5. furthermore, open package.json @scripts for option to command run 
6. "run [option]"

## description
1. Aplikasi Node JS  dengan menggunakan express js sebagai framework
2. Aplikasi dapat menampilkan data hasil dari API kemudian disimpan ke dalam database.
 
-  Get Data Product (Method Get)
    url :
https://portal.panelo.co/paneloresto/api/productlist/18

3. Setelah ambil data dari API simpan di database lokal kemudian tampilkan data produk dengan custom nilai limit. (data yang sudah diambil dari server jangan terambil lagi atau disimpan di database lokal).

4. Data produk bisa difilter berdasarkan kategori produk

5. Ada fungsi export ke xml dari data yang sudah di dapat

6. Ada fungsi export ke excel

7.  Produk bisa diupdate, delete, dan ditambah dan disimpan ke dalam database menggunakan database mysql / PostgreeAQL / SQL Server (pilih yang paling bisa)
