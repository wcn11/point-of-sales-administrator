<template>
  <div>
    <header>
      <div class="row">
        <div class="col-md-12 d-flex">
          <div>
            <button
              class="btn btn-info"
              id="btn-update-mass-price"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Update Masal Seluruh Harga Produk"
            >
              <i class="fad fa-usd-circle"></i> Mass Update Harga
            </button>
          </div>
          <div>
            <button
              class="btn btn-primary"
              id="btn-add-product"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Tambah Produk Baru (Sinkron Dengan Accurate)"
              @click="addProduct"
            >
              <i class="fad fa-usd-circle"></i> Produk Baru
            </button>
          </div>
          <div>
            <button
              class="btn btn-success rounded-circle"
              id="btn-sync"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Sinkron Dengan Accurate"
              @click="sync"
            >
              <i class="fad fa-sync-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div v-for="(product, index) in products" :key="index">
      <p>
        <a
          class="btn btn-primary"
          data-toggle="collapse"
          :href="`#collapese-${product['id']}`"
          role="button"
          aria-expanded="false"
          aria-controls="multiCollapseExample1"
          >{{ product["name"] }}</a
        >
      </p>

      <div class="row">
        <div class="col">
          <div
            class="collapse multi-collapse"
            :id="`collapese-${product['id']}`"
          >
            <div class="card card-body">
              <form>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <input type="email" class="form-control" id="inputEmail4" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword4"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputAddress">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                  />
                </div>
                <div class="form-group">
                  <label for="inputAddress2">Address 2</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress2"
                    placeholder="Apartment, studio, or floor"
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input type="text" class="form-control" id="inputCity" />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="inputState">State</label>
                    <select id="inputState" class="form-control">
                      <option selected>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div class="form-group col-md-2">
                    <label for="inputZip">Zip</label>
                    <input type="text" class="form-control" id="inputZip" />
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                    />
                    <label class="form-check-label" for="gridCheck">
                      Check me out
                    </label>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modal-add-product"
      tabindex="-1"
      aria-labelledby="modal-add-productLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <header class="bg-info text-center p-2">
          <h2 class="text-white">Produk Baru</h2>
        </header>
        <div class="modal-content">
          <div class="modal-body">
            <div>
              <div class="form-group">
                <label for="name">code</label>
                <input
                  type="text"
                  class="form-control"
                  id="code"
                  placeholder="0040001"
                  v-model="code"
                />
              </div>
              <div class="form-group">
                <label for="name">nama</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Paha Utuh 500 gr"
                  v-model="name"
                />
              </div>
              <div class="form-group">
                <label for="price">harga</label>
                <input
                  type="text"
                  class="form-control"
                  id="price"
                  placeholder="20.000,00"
                  v-model="price"
                />
              </div>
              <div class="form-group">
                <label for="price">Foto / Gambar</label>
                <input
                  type="file"
                  ref="image"
                  class="form-control"
                  id="image"
                  @change="handleFileUpload"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              tutup
            </button>
            <button type="button" class="btn btn-primary" @click="saveProduct">
              simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Item",
  data() {
    return {
      products: [],
      name: "",
      price: 0,
      code: "",
      image: "",
    };
  },
  methods: {
    saveProduct() {
      var bodyFormData = new FormData();

      bodyFormData.append("code", this.code);
      bodyFormData.append("name", this.name);
      bodyFormData.append("price", this.price);
      bodyFormData.append("image", this.image);

      return this.$http
        .post(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/items`,

          bodyFormData,

          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
              'Content-Type': "multipart/form-data",
            },
          }
        )
        .then((results) => {
          console.log(results);
          //   if (results["data"]["success"]) {
          //     this.products = results["data"]["data"];
          //   }
        })
        .catch((error) => {
          console.log(error.response);
          //   this.$alertify.error(error.response["data"]["message"]);
        });
    },
    items() {
      return this.$http
        .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/items`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((results) => {
          if (results["data"]["success"]) {
            this.products = results["data"]["data"];
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
        });
    },
    handleFileUpload() {
        console.log(this.$refs.image.files[0])
      this.image = this.$refs.image.files[0];
    },
    sync() {
      return this.$http
        .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/sync`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
          },
        })
        .then((results) => {
          console.log(results);
        })
        .catch((error) => {
          console.log(error);
          //   this.$alertify.error(error.response["data"]["data"]["d"]);
        });
    },
    addProduct() {
      $("#modal-add-product").modal("show");
    },
  },
  mounted() {
    $("#btn-update-mass-price").tooltip({ boundary: "window" });
    $("#btn-sync").tooltip({ boundary: "window" });
    $("#btn-add-product").tooltip({ boundary: "window" });
  },
  created() {
    this.items();
  },
};
</script>

<style></style>
