<template>
  <div class="home">
    <div class="wrapper">
      <header class="text-center">
        <h3>Promo Produk</h3>
      </header>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="m-auto">
          <button
            class="btn btn-info mr-1"
            id="btn-update-mass-price"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Buat Promo Produk Baru"
            @click="openModalAddProduct()"
          >
            <i class="fad fa-usd-circle"></i> Promo Baru
          </button>
        </div>
      </div>
    </div>
    <div class="table-responsive overflow-x-none">
      <table class="table table-borderless table-hover">
        <thead>
          <tr class="text-nowrap">
            <th>No</th>
            <th>SKU</th>
            <th>Produk</th>
            <th>Kategori</th>
            <th>Harga Dasar</th>
            <th>Komisi Pusat</th>
            <th>Komisi Mitra</th>
            <th>Harga Jual</th>
            <th>Ditawarkan Pada</th>
            <th>Status</th>
            <th>Pilihan</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in productPromo"
            :key="index"
            class="text-nowrap"
          >
            <td>
              {{ index + 1 }}
            </td>
            <td>
              {{ product["no"] }}
            </td>
            <td>
              {{ product["name"] }}
            </td>
            <td>
              {{ product["category_name"] }}
            </td>
            <td>
              {{ product["basic_price"] | formatMoney }}
            </td>
            <td>
              {{ product["centralCommission"] | formatMoney }}
            </td>
            <td>
              {{ product["partnerCommission"] | formatMoney }}
            </td>
            <td>
              {{ product["grand_price"] | formatMoney }}
            </td>
            <td>
              {{ product["created_at"] | formatDate }}
            </td>
            <td>
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  @click="updateStatusPromo(product)"
                  :id="`switchActive-${product['id']}`"
                  v-model="product['is_active']"
                />
                <label
                  class="custom-control-label"
                  :for="`switchActive-${product['id']}`"
                  >{{ product["is_active"] | isActive }}</label
                >
              </div>
            </td>
            <td>
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Edit
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a
                    class="dropdown-item"
                    href="javascript:void(0)"
                    @click="updateProductPromotion(product)"
                    >Ubah</a
                  >
                  <a
                    class="dropdown-item"
                    href="javascript:void(0)"
                    @click="removePromotion(product)"
                    >Hapus</a
                  >
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <!-- <tbody v-else>
          <tr class="justify-content-center text-center">
            <td colspan="11">Pengguna Belum Memiliki Produk Promo</td>
          </tr>
        </tbody> -->
      </table>
    </div>

    <!-- Modal remove-->
    <div
      class="modal fade"
      id="modal-remove-promo"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">Hapus Promo</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              Promo terkait akan langsung terhapus <br />
              Yakin Ingin Menghapusnya ?
            </p>
            <small
              ><i class="fad fa-info-circle"></i> Data pada accurate tidak akan
              terhapus</small
            >
            <br />
            <small
              ><i class="fad fa-info-circle"></i> Sekali terhapus, data tidak
              dapat dikembalikan</small
            >
            <br />
            <small
              ><i class="fad fa-info-circle"></i> Direkomendasikan Untuk
              Non-Aktifkan Saja</small
            >
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              tutup
            </button>
            <button type="button" class="btn btn-danger" @click="deletePromo()">
              Ya, saya mengerti
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modal-add-product"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-warning">
            <h5 class="modal-title" id="exampleModalLabel">
              Promo Produk Baru
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleFormControlSelect1">kategori</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="addProduct['data']['category']"
                  @change="updateCategory('add')"
                >
                  <option class="form-control" disabled selected>
                    Pilih Kategori
                  </option>
                  <option
                    v-for="(category, index) in categories['additionalData']"
                    :key="index"
                    :value="category"
                  >
                    {{ category["name"] }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Produk</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="addProduct['data']['product']"
                  @change="setAutoGrandPrice()"
                >
                  <option class="form-control" disabled selected>
                    Pilih Produk
                  </option>
                  <option
                    v-for="(product, index) in addProduct['additionalData']"
                    :key="index"
                    :value="product"
                  >
                    {{ product["name"] }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Harga Dasar</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="harga dasar"
                  disabled="true"
                  v-model="addProduct['data']['product']['basic_price']"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Komisi Pusat</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="komisi"
                  v-model="addProduct['data']['product']['centralCommission']"
                  @keyup="calculatePrice('add')"
                  @keypress="isNumber($event)"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Komisi Mitra</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="komisi"
                  v-model="addProduct['data']['product']['partnerCommission']"
                  @keyup="calculatePrice('add')"
                  @keypress="isNumber($event)"
                />
              </div>
              <div class="form-group">
                <label> Harga End-user </label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    id="round-price"
                    :disabled="
                      Object.keys(addProduct['data']['product']).length === 0
                    "
                    @click="roundPrice($event.target.checked, 'add')"
                  />
                  <small class="form-check-label" for="defaultCheck1">
                    bulatkan harga
                  </small>
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="harga"
                  v-model="addProduct['data']['product']['grand_price']"
                  @keypress="isNumber($event)"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              tutup
            </button>
            <button
              type="button"
              class="btn btn-warning"
              :disabled="!addProduct['data']['product']['grand_price']"
              @click="addPromo()"
            >
              simpan promo baru
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modal-edit-promo"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-warning">
            <h5 class="modal-title" id="exampleModalLabel">
              Perbarui Promo {{ updatePromo["data"]["product"]["name"] }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleFormControlSelect1">kategori</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="updatePromo['data']['category']['category_id']"
                  disabled
                >
                  <option
                    v-for="(category, index) in categories['additionalData']"
                    :key="index"
                    :value="category['id']"
                    :selected="
                      updatePromo['data']['category']['category_id'] ===
                      category['id']
                    "
                  >
                    {{ category["name"] }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Produk</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  disabled
                >
                  <option class="form-control" disabled selected>
                    Pilih Produk
                  </option>
                  <option
                    v-for="(product, index) in updatePromo['additionalData']"
                    :key="index"
                    :value="product"
                    :selected="
                      updatePromo['data']['product']['no'] === product['no']
                    "
                  >
                    {{ product["name"] }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="price">Harga Dasar</label>
                <div class="w-100 d-flex">
                  <input
                    type="text"
                    class="form-control sync-price"
                    id="price"
                    v-model="updatePromo['data']['product']['basic_price']"
                    readonly
                  />
                  <a
                    href="javascript:void(0)"
                    class="btn btn-primary"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Sinkron Harga Dasar Saat Ini"
                    @keypress="isNumber($event)"
                    @click="
                      syncPricePromo(updatePromo['data']['product']['no'])
                    "
                  >
                    <i class="fad fa-sync-alt"></i>
                  </a>
                </div>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Komisi Pusat</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="komisi"
                  v-model="updatePromo['data']['product']['centralCommission']"
                  @keypress="isNumber($event)"
                  @keyup="calculatePrice"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Komisi Mitra</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="komisi"
                  v-model="updatePromo['data']['product']['partnerCommission']"
                  @keypress="isNumber($event)"
                  @keyup="calculatePrice"
                />
              </div>
              <div class="form-group">
                <label> Harga End-user </label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked="true"
                    id="round-price"
                    :disabled="
                      Object.keys(updatePromo['data']['product']).length === 0
                    "
                    @click="roundPrice($event.target.checked, 'update')"
                  />
                  <small class="form-check-label" for="defaultCheck1">
                    bulatkan harga
                  </small>
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="harga"
                  v-model="updatePromo['data']['product']['grand_price']"
                  @keypress="isNumber($event)"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              tutup
            </button>
            <button
              type="button"
              class="btn btn-warning"
              :disabled="!updatePromo['data']['product']['grand_price']"
              @click="putPromo()"
            >
              simpan penawaran
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import moment from "moment";
moment.locale("id");

export default {
  name: "Promo",
  components: {},
  data() {
    return {
      user: {},
      productPromo: [],
      categories: {
        data: "",
        error: false,
        errorMessage: "",
        additionalData: [],
      },
      products: {
        data: "",
        error: false,
        errorMessage: "",
        additionalData: [],
      },
      addProduct: {
        data: {
          category: {},
          product: {},
          realPrice: 0,
        },
        error: false,
        errorMessage: "",
        additionalData: [],
      },
      removePromo: {},
      updatePromo: {
        data: {
          category: {},
          product: {},
          realPrice: 0,
        },
        error: false,
        errorMessage: "",
        additionalData: [],
      },
    };
  },
  methods: {
    syncPricePromo(no) {
      this.$root.loading = true;
      return this.$http
        .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/promo/${no}/price`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
          },
        })
        .then((results) => {
          if (results["data"]["success"]) {
            this.updatePromo["data"]["product"]["basic_price"] =
              results["data"]["data"]["basic_price"];
            this.$root.loading = false;
            this.calculatePrice("update");
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
          this.$root.loading = false;
        });
    },
    updateStatusPromo(promo) {
      this.$root.loading = true;
      return this.$http
        .put(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/promo/active`,
          {
            user_id: this.user["id"],
            promo_id: promo["id"],
            is_active: !promo["is_active"],
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            this.getproductPromo();
            this.$root.loading = false;
            this.$alertify.success(results["data"]["message"]);
          }
        })
        .catch((error) => {
          this.$root.loading = false;
          this.$alertify.error(error.response["data"]["message"]);
        });
    },
    deletePromo() {
      return this.$http
        .post(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/promo/delete`,
          {
            promo: this.removePromo,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            this.openModalremovePromo("hide");
            this.removePromo = {};
            this.getproductPromo();
            this.$root.loading = false;
            this.$alertify.success("Promo dihapus");
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
          this.$root.loading = false;
        });
    },
    updateProductPromotion(product) {
      this.updatePromo["data"]["product"] = product;
      this.updatePromo["data"]["category"] = {
        category_id: product["category_id"],
        category_name: product["category_name"],
      };
      this.updatePromo["data"]["realPrice"] = product["grand_price"];
      this.openModalupdatePromo();
    },
    removePromotion(product) {
      this.removePromo = product;
      this.openModalremovePromo();
    },
    openModalupdatePromo(type = "show") {
      $("#modal-edit-promo").modal(type);
    },
    openModalremovePromo(type = "show") {
      $("#modal-remove-promo").modal(type);
    },
    putPromo() {
      this.$root.loading = true;
      return this.$http
        .put(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/promo`,
          {
            product: this.updatePromo["data"]["product"]
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            this.openModalupdatePromo("hide");
            this.getproductPromo();
            this.$root.loading = false;
            this.$alertify.success("Promo diperbaharui");
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
          this.$root.loading = false;
        });
    },
    addPromo() {
      this.$root.loading = true;
      return this.$http
        .post(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/promo`,
          {
            product: this.addProduct["data"]["product"],
            user: this.user,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            this.openModalAddProduct("hide");
            this.getproductPromo();
            this.$root.loading = false;
            this.$alertify.success("Penawaran ditambahkan");
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
          this.$root.loading = false;
        });
    },
    setAutoGrandPrice(type = "add") {
      if (type == "add") {
        this.addProduct["data"]["realPrice"] = parseInt(
          this.addProduct["data"]["product"]["grand_price"]
        );
        this.calculatePrice();
      } else {
        this.updatePromo["data"]["realPrice"] = parseInt(
          this.updatePromo["data"]["product"]["grand_price"]
        );
        this.calculatePrice("update");
      }
    },
    calculatePrice(type = "add") {
      if (type === "add") {
        let grand_price =
          parseInt(this.addProduct["data"]["product"]["basic_price"]) +
          parseInt(this.addProduct["data"]["product"]["centralCommission"]) +
          parseInt(this.addProduct["data"]["product"]["partnerCommission"]);
        this.addProduct["data"]["product"]["grand_price"] = grand_price;
        this.addProduct["data"]["realPrice"] = grand_price;
        this.roundPrice($("#round-price")[0]["checked"]);
      } else {
        let grand_price =
          parseInt(this.updatePromo["data"]["product"]["basic_price"]) +
          parseInt(this.updatePromo["data"]["product"]["centralCommission"]) +
          parseInt(this.updatePromo["data"]["product"]["partnerCommission"]);
        this.updatePromo["data"]["product"]["grand_price"] = grand_price;
        this.updatePromo["data"]["realPrice"] = grand_price;
        this.roundPrice($("#round-price")[0]["checked"], "update");
      }
    },
    roundPrice(checked, type = "add") {
      if (type === "add") {
        if (Object.keys(this.addProduct["data"]["product"]).length !== 0) {
          if (checked) {
            this.addProduct["data"]["realPrice"] =
              this.addProduct["data"]["product"]["grand_price"];
            let money =
              this.addProduct["data"]["product"]["grand_price"].toString();
            let substrHundred = money.slice(-3);
            let substrTens = money.slice(-2);
            let concatHundredToFloat = Math.round(
              substrHundred.substring(0, 1).concat(".").concat(substrTens)
            );
            let roundedPrice = concatHundredToFloat.toString() + "00";
            let price = parseFloat(
              parseInt(
                money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
              )
                .toFixed(3)
                .replace(/[^\d]/g, "")
            );
            return (this.addProduct["data"]["product"]["grand_price"] =
              price + parseInt(roundedPrice));
          }
          this.addProduct["data"]["product"]["grand_price"] =
            this.addProduct["data"]["realPrice"];
          this.addProduct["data"]["realPrice"] = 0;
        }
      } else {
        if (Object.keys(this.updatePromo["data"]["product"]).length !== 0) {
          if (checked) {
            this.updatePromo["data"]["realPrice"] =
              this.updatePromo["data"]["product"]["grand_price"];
            let money =
              this.updatePromo["data"]["product"]["grand_price"].toString();
            let substrHundred = money.slice(-3);
            let substrTens = money.slice(-2);
            let concatHundredToFloat = Math.round(
              substrHundred.substring(0, 1).concat(".").concat(substrTens)
            );
            let roundedPrice = concatHundredToFloat.toString() + "00";
            let price = parseFloat(
              parseInt(
                money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
              )
                .toFixed(3)
                .replace(/[^\d]/g, "")
            );
            return (this.updatePromo["data"]["product"]["grand_price"] =
              price + parseInt(roundedPrice));
          }
          this.updatePromo["data"]["product"]["grand_price"] =
            this.updatePromo["data"]["realPrice"];
          this.updatePromo["data"]["realPrice"] = 0;
        }
      }
    },
    openModalAddProduct(type = "show") {
      $("#modal-add-product").modal(type);
    },
    updateCategory(type = "add") {
      this.$root.loading = true;

      let product = 0;

      if (type === "add") {
        product = this.addProduct["data"]["category"]["id"];
      } else {
        product = this.updatePromo["data"]["category"]["category_id"];
      }

      return this.$http
        .get(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/category/${product}/products`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            if (type === "add") {
              this.addProduct["additionalData"] = results["data"]["data"];
            } else {
              this.updatePromo["additionalData"] = results["data"]["data"];
            }
            this.$root.loading = false;
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
          this.$root.loading = false;
        });
    },
    getUser() {
      return this.$http
        .get(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/user/${this.$route.params.userId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            this.user = results["data"]["data"];
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
        });
    },
    getproductPromo() {
      return this.$http
        .get(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/promo/user/${this.$route.params.userId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            this.productPromo = results["data"]["data"];
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
        });
    },
    getCategory() {
      this.$root.loading = true;

      if (this.$root.loading) {
        this.$http
          .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/categories`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
              "Content-type": "application/json",
            },
          })
          .then((result) => {
            this.categories["additionalData"] = result.data;

            this.$root.loading = !this.$root.loading;
          })
          .catch((error) => {
            this.$alertify.error(error.response["data"]["message"]);
          });
      }
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
  filters: {
    isActive(active) {
      return active === 1 || active === true ? "Aktif" : "Non-Aktif";
    },
    isDefault(active) {
      return active === 1 || active === true ? "Pusat" : "Bukan Pusat";
    },
    formatDate(val) {
      return moment(val).format("Do MMMM YYYY");
    },
    formatMoney(val) {
      let formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return formatter.format(val);
    },
  },
  created() {
    this.getUser();
    this.getproductPromo();
    this.getCategory();
  },
};
</script>


<style scoped>
.conf-container {
  margin: auto;
}

.card-container {
  padding: 14px;
  border-radius: 15px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px 0px gray;
  color: white;
}

.card-col {
  padding: 10px;
}

.card-col:hover {
  transform: scaleY(1.1);
  cursor: pointer;
}

.overflow-x-none {
  overflow-x: unset;
}
.price {
  font-size: 25px;
  font-weight: bold;
}

.sync-price {
  margin-right: 10px;
}

@media only screen and (max-width: 600px) {
  .table-responsive {
    overflow-x: auto;
  }
}
</style>
