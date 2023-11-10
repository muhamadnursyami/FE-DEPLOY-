import axios from "axios";
import { useEffect, useState } from "react";
import CardBuku from "../../components/CardBuku";
import styles from "./Buku.module.css";
export default function Buku() {
  //untuk menghandle search inputan
  const [searchInput, setSearchInput] = useState("");
  // untuk menghandle pemilihan search berdasarkan all, title, author
  const [searchType, setSearchType] = useState("All");
  // untuk handle hasil search yang sudah di olah
  const [searchResult, setSearchResult] = useState([]);

  // logic menghandle search
  const handleSearch = () => {
    // variable untuk menampung data hasil yang telah di proses
    let filteredData = [];
    // jika data kosong
    if (searchInput.trim() === "") {
      setSearchResult([]);
    } else {
      // duplikasi semua data, dari state data diatas, kedalam satu variable
      // bernama allData
      const allData = [
        ...data.dataRandom,
        ...data.dataPopuler,
        ...data.dataAkademik,
        ...data.dataLainnya,
      ];
      // jika type search nya itu all
      if (searchType === "All") {
        // looping semua data menggunakan filter
        filteredData = allData.filter((book) =>
          // object.values mengembalikan array  dari nilai  setiap item
          // .some () adalah mengecek  apakah setidaknya salah satu nilai tersebut
          // mengandung bagian dari kata kunci  yang di inputkan pengguna
          Object.values(book).some(
            (value) =>
              value &&
              // value dijadikan string, dijadikan huruf kecil
              // dan mengandung inputkan dari pengguna yang di jadikan hurufh kecil semua
              value.toString().toLowerCase().includes(searchInput.toLowerCase())
          )
        );
      }
      // jika searchTypenya bukan all maka akan di handle dibagian ini
      else {
        // all data akan di filter berdasarkan kata kunci yang dimasukkan  kedalam
        // search input.
        filteredData = allData.filter((book) =>
          //  mengakses nilai dari properti objek sesuai dengan nilai dari searchType
          // kemudian di ubah menjadi huruf kecil
          book[searchType.toLowerCase()]
            // kemudian di ubah menjadi string , dan huruf huruf kecil
            // yang mengandung search input
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        );
      }

      // untuk menghapus duplikasi dari array filteredData
      // filteredData.map(JSON.stringify) mengonversi setiap objek dalam array filteredData
      // menjadi string dengan menggunakan JSON.stringify. Ini dilakukan agar setiap objek
      // direpresentasikan dalam bentuk string.
      // new Set(...) menciptakan sebuah Set, yang secara alami menghilangkan duplikasi,
      //  dari array string yang dihasilkan dari langkah sebelumnya. Set adalah struktur
      //  data yang hanya dapat menyimpan nilai unik, sehingga jika ada duplikasi, hanya
      //  satu nilai yang akan disimpan.
      // Array.from(...) mengonversi kembali hasil Set ke dalam bentuk array.
      // map(JSON.parse) melakukan parsing kembali dari setiap string yang ada di dalam
      // array kembali menjadi objek menggunakan JSON.parse, sehingga Anda mendapatkan
      // kembali array dengan objek yang unik dari objek-objek yang sebelumnya mungkin
      //  memiliki duplikasi.
      filteredData = Array.from(new Set(filteredData.map(JSON.stringify))).map(
        JSON.parse
      );
      setSearchResult(filteredData);
    }
  };

  return (
    <>
      {/* <!-- SEARCH BUKU */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="input-group mb-3 w-75 mt-3">
            <button
              className="btn btn-outline-dark dropdown-toggle rounded-start-5 border border-black shadow-sm"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="filter-button"
            >
              {searchType}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSearchType("All")}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSearchType("Title")}
                >
                  Title
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSearchType("Author")}
                >
                  Author
                </button>
              </li>
            </ul>
            <input
              type="text"
              className="form-control border border-black border-end-0"
              aria-label="Text input with dropdown button"
              id="search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary border border-black rounded-end-5"
              type="button"
              id="search-button"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6 col-md-12">
              <div className="container mt-5">
                <div id={styles.quoteCarousel} className="col-8 carousel slide" data-bs-ride="carousel">
                  <h3 className={styles.judulCarousel}>Motivasi Hari Ini</h3>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <p className={styles.quote}>"Di balik kesuksesan terciptanya sebuah produk, ada sebuah tim kuat di dalamnya."</p>
                      <p className={styles.author1}>- Itadori Yuji</p>
                    </div>
                    <div className="carousel-item">
                      <p className={styles.quote}>"Kemampuan membaca adalah jendela dunia."</p>
                      <p className={styles.author2}>- George Washington Carver</p>
                    </div>
                    <div className="carousel-item">
                      <p className={styles.quote}>"Literasi membuka pintu menuju pemahaman dan pemikiran yang mendalam"</p>
                      <p className={styles.author3}>- Barack Obama</p>
                    </div>
                  </div>
                  <ol className={styles.indikator}>
                    <li data-bs-target="#quoteCarousel" data-bs-slide-to={0} className="active" />
                    <li data-bs-target="#quoteCarousel" data-bs-slide-to={1} />
                    <li data-bs-target="#quoteCarousel" data-bs-slide-to={2} />
                  </ol>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}