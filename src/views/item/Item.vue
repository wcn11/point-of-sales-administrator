<template>
  <div>
    <header class="card-header header-category" v-if="products">
      <h2 class="headline">Pengaturan Produk</h2>

      <button
        class="btn btn-success rounded-circle"
        id="btn-sync"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Sinkron Dengan Accurate"
        disabled
      >
        <i class="fad fa-sync-alt"></i>
      </button>
    </header>

    <div class="row mt-5">
      <div
        class="col-md-3 col-sm-4 resource-container"
        v-for="(product, index) in products"
        :key="index"
      >
        <div class="card card-container">
          <div class="text-center">
            <img
              :src="getImage(product['no'])"
              class="card-img-top"
              alt="Gambar Ayam"
              @click="openModalProduct(product['id'])"
            />
            <div class="p-2 justify-content-around">
              <span
                class="m-1 toolbar-item"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Ubah Produk"
                @click="openModalProduct(product['id'])"
                ><i class="fad fa-edit"></i
              ></span>
              <span
                class="m-1 text-danger toolbar-item"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Hapus Produk"
                @click="openModalRemoveProduct(product['id'])"
                ><i class="fad fa-trash"></i
              ></span>
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title card-title-product">{{ product["name"] }}</h5>
            <span></span>

            <p>Harga dasar</p>
            <h6 class="price" @dblclick="editPriceLabel($event, product['id'])">
              {{ product["basic_price"] | formatMoney }}
            </h6>

            <p>Komisi Pusat</p>
            <h6 class="price" @dblclick="editPriceLabel($event, product['id'])">
              {{ product["centralCommission"] | formatMoney }}
            </h6>

            <p>Komisi Mitra</p>
            <h6 class="price" @dblclick="editPriceLabel($event, product['id'])">
              {{ product["partnerCommission"] | formatMoney }}
            </h6>

            <p>Total Harga</p>
            <h6 class="price" @dblclick="editPriceLabel($event, product['id'])">
              {{ product["grand_price"] | formatMoney }}
            </h6>
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
                <label for="name">UPC / Barcode</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': addProduct['code']['error'] }"
                  id="code"
                  placeholder="cth: 0040001"
                  v-model="addProduct['code']['data']"
                />
                <div class="invalid-feedback">
                  {{ addProduct["code"]["errorMessage"] }}
                </div>
              </div>
              <div class="form-group">
                <label for="name">nama</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': addProduct['name']['error'] }"
                  id="name"
                  placeholder="Paha Utuh 500 gr"
                  v-model="addProduct['name']['data']"
                />
                <div class="invalid-feedback">
                  {{ addProduct["name"]["errorMessage"] }}
                </div>
              </div>
              <div class="form-group">
                <label for="name">Tipe</label>
                <select
                  name="type"
                  id="type"
                  class="form-control"
                  :class="{ 'is-invalid': addProduct['type']['error'] }"
                  v-model="addProduct['type']['data']"
                >
                  <option value="" disabled selected>Tipe Barang</option>
                  <option
                    v-for="(type, index) in addProduct['type'][
                      'additionalData'
                    ]"
                    :key="index"
                    :value="type"
                  >
                    {{ type }}
                  </option>
                </select>
                <div class="invalid-feedback">
                  {{ addProduct["type"]["errorMessage"] }}
                </div>
              </div>
              <div class="form-group">
                <label for="category">Kategori</label>
                <select
                  name="category"
                  id="category"
                  class="form-control"
                  :class="{ 'is-invalid': addProduct['category']['error'] }"
                  v-model="addProduct['category']['data']"
                >
                  <option value="" disabled selected>Kategori Barang</option>
                  <option
                    v-for="(category, index) in addProduct['category'][
                      'additionalData'
                    ]"
                    :key="index"
                    :value="category['id']"
                  >
                    {{ category["name"] }}
                  </option>
                </select>
                <div class="invalid-feedback">
                  {{ addProduct["category"]["errorMessage"] }}
                </div>
              </div>
              <div class="form-group">
                <label for="name">Unit</label>
                <select
                  name="unit"
                  id="unit"
                  class="form-control"
                  :class="{ 'is-invalid': addProduct['unit']['error'] }"
                  v-model="addProduct['unit']['data']"
                >
                  <option value="" disabled selected>Unit Barang</option>
                  <option
                    v-for="(unit, index) in addProduct['unit'][
                      'additionalData'
                    ]"
                    :key="index"
                    :value="unit['id']"
                  >
                    {{ unit["name"] }}
                  </option>
                </select>
                <div class="invalid-feedback">
                  {{ addProduct["unit"]["errorMessage"] }}
                </div>
              </div>

              <!-- <div class="form-group">
                <label for="price">harga dasar</label>
                <div class="w-100 d-flex">
                  <input
                    type="text"
                    class="form-control sync-price"
                    :class="{
                      'is-invalid': addProduct['price']['error'],
                    }"
                    id="price"
                    placeholder="20.000,00"
                    v-model="addProduct['price']['data']"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Sinkron Harga Dasar Dengan Accurate"
                  />
                  <button
                    class="btn btn-primary"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Sinkron Harga Dasar Dengan Accurate"
                    @click="syncPrice('', 'add')"
                  >
                    <i class="fad fa-sync-alt"></i>
                  </button>
                </div>
                <div class="invalid-feedback">
                  {{ addProduct["price"]["errorMessage"] }}
                </div>
              </div>
              <div class="form-group">
                <label for="centralCommission">komisi pusat</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': addProduct['centralCommission']['error'],
                  }"
                  id="centralCommission"
                  placeholder="Rp 1.000,00"
                  v-model="addProduct['centralCommission']['data']"
                />
                <div class="invalid-feedback">
                  {{ addProduct["centralCommission"]["errorMessage"] }}
                </div>
              </div>
              <div class="form-group">
                <label for="partnerCommission">komisi mitra</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': addProduct['partnerCommission']['error'],
                  }"
                  id="partnerCommission"
                  placeholder="Rp 4.000,00"
                  v-model="addProduct['partnerCommission']['data']"
                />
                <div class="invalid-feedback">
                  {{ addProduct["partnerCommission"]["errorMessage"] }}
                </div>
              </div>
              <div class="form-group">
                <label for="grand_price">harga jual</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': addProduct['grand_price']['error'] }"
                  id="grand_price"
                  placeholder="Rp 25.000,00"
                  v-model="addProduct['grand_price']['data']"
                />
                <div class="invalid-feedback">
                  {{ addProduct["grand_price"]["errorMessage"] }}
                </div>
              </div> -->
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

    <div
      class="modal fade"
      id="modal-product"
      tabindex="-1"
      aria-labelledby="modal-productLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" v-if="selectedProduct">
        <header class="bg-info text-center p-2">
          <h2 class="text-white">Produk {{ selectedProduct["name"] }}</h2>
        </header>
        <div class="modal-content">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                class="nav-link active"
                id="nav-detail-tab"
                data-toggle="tab"
                href="#nav-detail"
                role="tab"
                aria-controls="nav-detail"
                aria-selected="true"
                >Detail</a
              >
              <a
                class="nav-link"
                id="nav-profile-tab"
                data-toggle="tab"
                href="#nav-profile"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
                @click="openEditProduct"
                >Edit</a
              >
              <a
                class="nav-link"
                id="nav-stok-tab"
                data-toggle="tab"
                href="#nav-stok"
                role="tab"
                aria-controls="nav-stok"
                aria-selected="false"
                >Stok</a
              >
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-detail"
              role="tabpanel"
              aria-labelledby="nav-detail-tab"
            >
              <div class="container-fluid">
                <img
                  :src="getImage(selectedProduct['no'])"
                  class="img-fluid rounded w-100"
                  alt="Gambar Ayam"
                />

                <h3>{{ selectedProduct["name"] }}</h3>
                <small class="badge badge-pill badge-success">{{
                  selectedProduct["type"]
                }}</small>
                <p>{{ selectedProduct["no"] }}</p>

                <span class="badge badge-pill badge-secondary text-uppercase">{{
                  selectedProduct["unit_name"]
                }}</span>
                <div>
                  <h4>
                    <b>Harga Dasar</b>
                    {{ selectedProduct["basic_price"] | formatMoney }}
                  </h4>
                  <h4>
                    <b>Komisi Pusat</b>
                    {{ selectedProduct["centralCommission"] | formatMoney }}
                  </h4>
                  <h4>
                    <b>Komisi Mitra</b>
                    {{ selectedProduct["partnerCommission"] | formatMoney }}
                  </h4>
                  <h4>
                    <b>Harga Jual</b>
                    {{ selectedProduct["grand_price"] | formatMoney }}
                  </h4>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <div class="modal-content">
                <div class="modal-body">
                  <div>
                    <div class="form-group">
                      <label for="name">UPC / Barcode</label>
                      <input
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': editProduct['code']['error'] }"
                        id="code"
                        placeholder="cth: 0040001"
                        v-model="editProduct['code']['data']"
                        disabled="disabled"
                      />
                      <div class="invalid-feedback">
                        {{ editProduct["code"]["errorMessage"] }}
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="name">nama</label>
                      <input
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': editProduct['name']['error'] }"
                        id="name"
                        placeholder="Paha Utuh 500 gr"
                        v-model="editProduct['name']['data']"
                      />
                      <div class="invalid-feedback">
                        {{ editProduct["name"]["errorMessage"] }}
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="name">Tipe</label>
                      <select
                        name="type"
                        id="type"
                        class="form-control"
                        :class="{ 'is-invalid': editProduct['type']['error'] }"
                        v-model="editProduct['type']['data']"
                      >
                        <option value="" disabled selected>Tipe Barang</option>
                        <option
                          v-for="(type, index) in editProduct['type'][
                            'additionalData'
                          ]"
                          :key="index"
                          :value="type"
                        >
                          {{ type }}
                        </option>
                      </select>
                      <div class="invalid-feedback">
                        {{ editProduct["type"]["errorMessage"] }}
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="category">Kategori</label>
                      <select
                        name="category"
                        id="category"
                        class="form-control"
                        :class="{
                          'is-invalid': editProduct['category']['error'],
                        }"

                        disabled="disabled"
                        v-model="editProduct['category']['data']"
                      >
                        <option value="" disabled selected>
                          Kategori Barang
                        </option>
                        <option
                          v-for="(category, index) in editProduct['category'][
                            'additionalData'
                          ]"
                          :key="index"
                          :value="category['id']"
                        >
                          {{ category["name"] }}
                        </option>
                      </select>
                      <div class="invalid-feedback">
                        {{ editProduct["type"]["errorMessage"] }}
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="name">Unit</label>
                      <select
                        name="unit"
                        id="unit"
                        class="form-control"
                        :class="{ 'is-invalid': editProduct['unit']['error'] }"
                        v-model="editProduct['unit']['data']"
                      >
                        <option value="" disabled selected>Unit Barang</option>
                        <option
                          v-for="(unit, index) in editProduct['unit'][
                            'additionalData'
                          ]"
                          :key="index"
                          :value="unit['id']"
                        >
                          {{ unit["name"] }}
                        </option>
                      </select>
                      <div class="invalid-feedback">
                        {{ editProduct["type"]["errorMessage"] }}
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="price">harga dasar</label>
                      <div class="w-100 d-flex">
                        <input
                          type="text"
                          class="form-control sync-price"
                          :class="{
                            'is-invalid': editProduct['price']['error'],
                          }"
                          id="price"
                          placeholder="20.000,00"
                          v-model="editProduct['price']['data']"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Sinkron Harga Dasar Dengan Accurate"
                          readonly
                        />
                        <button
                          class="btn btn-primary"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Sinkron Harga Dasar Dengan Accurate"
                          @click="
                            syncPrice(selectedProduct['accurate_product_id'])
                          "
                        >
                          <i class="fad fa-sync-alt"></i>
                        </button>
                      </div>
                      <div class="invalid-feedback">
                        {{ editProduct["price"]["errorMessage"] }}
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="centralCommission">komisi pusat</label>
                      <input
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            editProduct['centralCommission']['error'],
                        }"
                        id="centralCommission"
                        placeholder="Rp 1.000,00"
                        v-model="editProduct['centralCommission']['data']"
                        @keyup="calculatePrice"
                      />
                      <div class="invalid-feedback">
                        {{ editProduct["centralCommission"]["errorMessage"] }}
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="partnerCommission">komisi mitra</label>
                      <input
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            editProduct['partnerCommission']['error'],
                        }"
                        id="partnerCommission"
                        placeholder="0000"
                        v-model.number="
                          editProduct['partnerCommission']['data']
                        "
                        @keyup="calculatePrice"
                      />
                      <div class="invalid-feedback">
                        {{ editProduct["partnerCommission"]["errorMessage"] }}
                      </div>
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
                      Object.keys(editProduct['grand_price']['data']).length < 0
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
                  v-model="editProduct['grand_price']['data']"
                  @keypress="isNumber($event)"
                />
              </div>
                    
                    <!-- <div class="form-group">
                      <label for="grand_price">harga jual</label>
                      <input
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid': editProduct['grand_price']['error'],
                        }"
                        id="grand_price"
                        placeholder="0000"
                        v-model="editProduct['grand_price']['data']"
                      />
                      <div class="invalid-feedback">
                        {{ editProduct["grand_price"]["errorMessage"] }}
                      </div>
                    </div> -->

                    <div class="form-group">
                      <label for="price">Foto / Gambar</label>
                      <input
                        type="file"
                        ref="imageUpdate"
                        class="form-control"
                        id="image"
                        @change="handleFileUpdate"
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
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="updateProduct"
                  >
                    simpan
                  </button>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade p-3"
              id="nav-stok"
              role="tabpanel"
              aria-labelledby="nav-stok-tab"
            >
              <div
                class="form-inline"
                v-for="(stock, index) in selectedProduct['product_partner']"
                :key="index"
              >
                <div class="form-check mb-2 mr-sm-2 w-25 justify-content-start">
                  <label
                    class="form-check-label text-left"
                    for="inlineFormCheck"
                  >
                    {{ stock["branch_name"] }}
                  </label>
                </div>
                <div class="input-group mb-2 mr-sm-2">
                  <input
                    type="text"
                    class="form-control"
                    v-model="stock['stock']"
                  />
                </div>

                <button
                  type="button"
                  @click="syncProductStock(selectedProduct['no'], stock, index)"
                  class="btn btn-primary mb-2"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Sinkron Dengan Accurate"
                >
                  <i class="fad fa-sync-alt"></i>
                </button>
              </div>

              <button
                type="button"
                class="btn btn-primary mb-2 w-100"
                @click="updateStock"
              >
                <i class="fad fa-sync-alt"></i>
                update
              </button>
            </div>
          </div>

          <div class="modal-footer justify-content-center">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              tutup
            </button>
            <!-- <button type="button" class="btn btn-primary" @click="saveProduct">
              simpan
            </button> -->
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modal-remove-product"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">Hapus Produk</h5>
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
            <p>Apakah Anda Yakin Ingin Menghapus Produk ?</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              tutup
            </button>
            <button type="button" class="btn btn-danger" @click="removeProduct">
              hapus
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="button-add-product" @click="openModalAddProduct">
      <button class="btn btn-info rounded-circle">
        <i class="fad fa-user-plus"></i>
      </button>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Item",
  components: {},
  data() {
    return {
      products: [],
      addProduct: {
        code: {
          data: "",
          error: false,
          errorMessage: "",
        },
        name: {
          data: "",
          error: false,
          errorMessage: "",
        },
        type: {
          data: "",
          error: false,
          errorMessage: "",
          additionalData: [
            "GROUP",
            "INVENTORY",
            "NON_INVENTORY",
            "PRODUCTION_COST",
            "SERVICE",
            "VARIANT",
          ],
        },
        category: {
          data: "",
          error: false,
          errorMessage: "",
          additionalData: [],
        },
        unit: {
          data: "",
          error: false,
          errorMessage: "",
          additionalData: [],
        },
        price: {
          data: 0,
          error: false,
          errorMessage: "",
        },
        centralCommission: {
          data: 0,
          error: false,
          errorMessage: "",
        },
        partnerCommission: {
          data: 0,
          error: false,
          errorMessage: "",
        },
        grand_price: {
          data: 0,
          error: false,
          errorMessage: "",
        },
        image: {
          data: "",
          error: false,
          errorMessage: "",
        },
      },
      editProduct: {
        code: {
          data: "",
          error: false,
          errorMessage: "",
        },
        name: {
          data: "",
          error: false,
          errorMessage: "",
        },
        type: {
          data: "",
          error: false,
          errorMessage: "",
          additionalData: [
            "GROUP",
            "INVENTORY",
            "NON_INVENTORY",
            "PRODUCTION_COST",
            "SERVICE",
            "VARIANT",
          ],
        },
        category: {
          data: "",
          error: false,
          errorMessage: "",
          additionalData: [],
        },
        unit: {
          data: "",
          error: false,
          errorMessage: "",
          additionalData: [],
        },
        price: {
          data: 0,
          error: false,
          errorMessage: "",
        },
        centralCommission: {
          data: 0,
          error: false,
          errorMessage: "",
        },
        partnerCommission: {
          data: 0,
          error: false,
          errorMessage: "",
        },
        grand_price: {
          data: 0,
          error: false,
          errorMessage: "",
        },
        image: {
          data: "",
          error: false,
          errorMessage: "",
        },
      },
      selectedProduct: {},
      userStocks: [],
      selectedRemove: 0,
    };
  },
  methods: {
    updateProduct() {
      this.$root.loading = true;
      var bodyFormData = new FormData();

      bodyFormData.append("code", this.editProduct["code"]["data"]);
      bodyFormData.append("name", this.editProduct["name"]["data"]);
      bodyFormData.append("type", this.editProduct["type"]["data"]);
      bodyFormData.append("category", this.editProduct["category"]["data"]);
      bodyFormData.append("unit", this.editProduct["unit"]["data"]);
      bodyFormData.append("price", this.editProduct["price"]["data"]);

      let category_name = this.editProduct["category"]["additionalData"].filter(
        (category) => category.id === this.editProduct["category"]["data"]
      )[0]["name"];

      bodyFormData.append("category_name", category_name);
      bodyFormData.append(
        "centralCommission",
        this.editProduct["centralCommission"]["data"]
      );
      bodyFormData.append(
        "partnerCommission",
        this.editProduct["partnerCommission"]["data"]
      );
      bodyFormData.append(
        "grand_price",
        this.editProduct["grand_price"]["data"]
      );
      bodyFormData.append("image", this.editProduct["image"]["data"]);

      return this.$http
        .post(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/items/${this.selectedProduct["id"]}`,

          bodyFormData,

          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            this.$alertify.success(results["data"]["message"]);
            this.getProducts();
            this.addProduct = {
              code: {
                data: "",
                error: false,
                errorMessage: "",
              },
              name: {
                data: "",
                error: false,
                errorMessage: "",
              },
              type: {
                data: "",
                error: false,
                errorMessage: "",
                additionalData: [
                  "GROUP",
                  "INVENTORY",
                  "NON_INVENTORY",
                  "PRODUCTION_COST",
                  "SERVICE",
                  "VARIANT",
                ],
              },
              unit: {
                data: "",
                error: false,
                errorMessage: "",
              },
              category: {
                data: "",
                error: false,
                errorMessage: "",
              },
              price: {
                data: 0,
                error: false,
                errorMessage: "",
              },
              centralCommission: {
                data: 0,
                error: false,
                errorMessage: "",
              },
              partnerCommission: {
                data: 0,
                error: false,
                errorMessage: "",
              },
              grand_price: {
                data: 0,
                error: false,
                errorMessage: "",
              },
              image: {
                data: "",
                error: false,
                errorMessage: "",
              },
            };
            $("#modal-product").modal("hide");
            this.$root.loading = false;
          }
        })
        .catch((error) => {
          if (error.response.data.success)
            this.$alertify.error(error.response["data"]["message"]);
        });
    },
    saveProduct() {
      this.$root.loading = true;
      var bodyFormData = new FormData();

      bodyFormData.append("code", this.addProduct["code"]["data"]);
      bodyFormData.append("name", this.addProduct["name"]["data"]);
      bodyFormData.append("type", this.addProduct["type"]["data"]);
      bodyFormData.append("category", this.addProduct["category"]["data"]);
      bodyFormData.append("unit", this.addProduct["unit"]["data"]);

      let category_name = this.addProduct["category"]["additionalData"].filter(
        (category) => category.id === this.addProduct["category"]["data"]
      )[0]["name"];

      bodyFormData.append("category_name", category_name);

      bodyFormData.append("image", this.addProduct["image"]["data"]);

      return this.$http
        .post(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/items`,

          bodyFormData,

          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            this.$alertify.success(results["data"]["message"]);

            this.getProducts();

            this.addProduct = {
              code: {
                data: "",
                error: false,
                errorMessage: "",
              },
              name: {
                data: "",
                error: false,
                errorMessage: "",
              },
              type: {
                data: "",
                error: false,
                errorMessage: "",
                additionalData: [
                  "GROUP",
                  "INVENTORY",
                  "NON_INVENTORY",
                  "PRODUCTION_COST",
                  "SERVICE",
                  "VARIANT",
                ],
              },
              unit: {
                data: "",
                error: false,
                errorMessage: "",
                additionalData: this.addProduct["unit"]["additionalData"],
              },
              category: {
                data: "",
                error: false,
                errorMessage: "",
                additionalData: this.addProduct["category"]["additionalData"],
              },
              price: {
                data: 0,
                error: false,
                errorMessage: "",
              },
              centralCommission: {
                data: 0,
                error: false,
                errorMessage: "",
              },
              partnerCommission: {
                data: 0,
                error: false,
                errorMessage: "",
              },
              grand_price: {
                data: 0,
                error: false,
                errorMessage: "",
              },
              image: {
                data: "",
                error: false,
                errorMessage: "",
              },
            };

            $("#modal-add-product").modal("hide");
            this.$root.loading = false;
          }
        })
        .catch((error) => {
          console.log(error.response);
          //   this.$alertify.error(error.response["data"]["message"]);
        });
    },
    openEditProduct() {
      (this.editProduct["code"]["data"] = this.selectedProduct.no),
        (this.editProduct["name"]["data"] = this.selectedProduct.name),
        (this.editProduct["type"]["data"] = this.selectedProduct.type),
        (this.editProduct["unit"]["data"] = this.selectedProduct.unit_id),
        (this.editProduct["category"]["data"] =
          this.selectedProduct.category_id),
        (this.editProduct["price"]["data"] = this.selectedProduct.basic_price),
        (this.editProduct["centralCommission"]["data"] =
          this.selectedProduct.centralCommission),
        (this.editProduct["partnerCommission"]["data"] =
          this.selectedProduct.partnerCommission),
        (this.editProduct["grand_price"]["data"] =
          this.selectedProduct.grand_price),
        (this.editProduct["image"]["data"] = this.selectedProduct.image);
        (this.editProduct["realPrice"] = this.selectedProduct.grand_price);
        this.roundPrice($("#round-price")[0]["checked"])
    },
    openModalProduct(id) {
      this.$root.loading = true;
      this.selectedProduct = this.products.filter((value, index) => {
        if (value.id === id) {
          value["index"] = index;
          return value;
        }
      })[0];
      $("#modal-product").modal("show");
      $("#nav-detail-tab").tab("show");
      $("#nav-detail").tab("show");
      this.$root.loading = false;
    },
    openModalRemoveProduct(id) {
      this.selectedRemove = id;
      $("#modal-remove-product").modal("show");
    },
    removeProduct() {
      this.$root.loading = true;
      return this.$http
        .delete(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/items/${this.selectedRemove}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            this.$root.loading = false;
            this.getProducts();
            $("#modal-remove-product").modal("hide");
            this.$alertify.success("Berhasil Menghapus");
            return;
          }
          this.$root.loading = false;
        })
        .catch((error) => {
          if (error.response["data"]["message"]) {
            this.addProduct["code"]["error"] = true;
            this.addProduct["code"]["errorMessage"] =
              error.response["data"]["message"];
          }
          this.$root.loading = false;
          // this.$alertify.error(error.response["data"]["message"]);
        });
    },
    editPriceLabel(event) {
      var target = event.target || event.srcElement;
      target.contentEditable = true;
    },
    checkNoProductExist() {
      this.$root.loading = true;
      return this.$http
        .get(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/items/check/${this.addProduct["code"]["data"]}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((results) => {
          if (!results["data"]["data"]) {
            this.addProduct["code"]["error"] = false;
            this.addProduct["code"]["errorMessage"] = "";
            this.$root.loading = false;
          }
        })
        .catch((error) => {
          if (error.response["data"]["message"]) {
            this.addProduct["code"]["error"] = true;
            this.addProduct["code"]["errorMessage"] =
              error.response["data"]["message"];
          }
          // this.$alertify.error(error.response["data"]["message"]);
        });
    },
    getImage(no) {
      try {
        let product = this.products.filter((value) => value.no === no)[0];

        let image = JSON.parse(product["image"]);

        return process.env.VUE_APP_BASE_HOST_API + image["thumbURL"];
      } catch (e) {
        let image = require(`./../../assets/products/default.jpeg`);

        return image;
      }
    },
    getProducts() {
      this.$root.loading = true;
      return this.$http
        .get(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/category/${this.$route.params.categoryId}/products`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            this.products = results["data"]["data"];
            this.$root.loading = false;
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
        });
    },
    handleFileUpload() {
      this.addProduct["image"]["data"] = this.$refs.image.files[0];
    },
    handleFileUpdate() {
      this.editProduct["image"]["data"] = this.$refs.imageUpdate.files[0];
    },
    syncProductStock(no, productPartner, index) {
      this.$root.loading = true;
      return this.$http
        .get(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/sync/stock/${no}/user/${productPartner["user_id"]}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          }
        )
        .then((results) => {
          if (results["data"]["data"]["s"]) {
            this.selectedProduct["product_partner"][index]["stock"] =
              Math.floor(results["data"]["data"]["d"]["availableStock"]);
            this.$alertify.success("Berhasil sinkron");
            this.$root.loading = false;
          } else {
            this.$alertify.error(results["data"]["data"]["d"]);
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
        });
    },
    calculatePrice() {
      this.editProduct["grand_price"]["data"] =
        parseInt(this.editProduct["price"]["data"]) +
        parseInt(this.editProduct["centralCommission"]["data"]) +
        this.editProduct["partnerCommission"]["data"];
    },
    syncPrice(id) {
      this.$root.loading = true;
      if (id === "" || id === undefined) {
        this.$alertify.warning("Harap isi UPC / Barcode");
        this.$root.loading = false;
        return;
      }
      return this.$http
        .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/sync/${id}/price`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
          },
        })
        .then((results) => {
          if (results["data"]["success"]) {
            if (results["data"]["data"]["s"]) {
              this.selectedProduct["basic_price"] = parseInt(
                results["data"]["data"]["d"]["balanceUnitCost"]
              );
              this.editProduct["price"]["data"] = parseInt(
                results["data"]["data"]["d"]["balanceUnitCost"]
              );
              this.$alertify.success("Berhasil sinkron harga");
              this.$root.loading = false;
              // let price = results["data"]["data"]["d"]["balanceUnitCost"];
              this.calculatePrice();
              return;
            } else {
              results["data"]["data"]["d"].map((message) => {
                this.$alertify.warning(message);
                this.$root.loading = false;
              });
            }
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
        });
    },
    updateStock() {
      this.$root.loading = true;
      return this.$http
        .post(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/items/stock/update`,
          {
            product: this.selectedProduct,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            this.$alertify.success(results["data"]["message"]);
            this.$root.loading = false;
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
          this.$root.loading = false;
        });
    },
    openModalAddProduct() {
      this.addProduct["price"]["data"] = 0;
      $("#modal-add-product").modal("show");
    },
    getListUnit() {
      this.$root.loading = true;
      return this.$http
        .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/items/list-unit`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
          },
        })
        .then((results) => {
          if (results["data"]["success"]) {
            let unit = results["data"]["data"]["d"];
            this.addProduct["unit"]["additionalData"] = unit;
            this.editProduct["unit"]["additionalData"] = unit;
            this.$root.loading = false;
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["data"]["d"]);
          this.$root.loading = false;
        });
    },
    getCategories() {
      this.$root.loading = true;
      return this.$http
        .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/items/categories`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
          },
        })
        .then((results) => {
          if (results["data"]["success"]) {
            let categories = results["data"]["data"];
            this.addProduct["category"]["additionalData"] = categories;
            this.editProduct["category"]["additionalData"] = categories;
            this.$root.loading = false;
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
          this.$root.loading = false;
        });
    },

    roundPrice(checked) {
        if (parseInt(this.editProduct['grand_price']['data']) > 0) {
          if (checked) {
            let money =
              this.editProduct["grand_price"]['data'].toString();
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
            return (this.editProduct["grand_price"]['data'] =
              price + parseInt(roundedPrice));
          }else{
          this.editProduct["grand_price"]['data'] =
            this.editProduct["realPrice"];
          // this.editProduct["realPrice"] = 0;
          }
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
  mounted() {
    $("#btn-update-mass-price").tooltip({ boundary: "window" });
    $("#btn-sync").tooltip({ boundary: "window" });
    $("#btn-add-product").tooltip({ boundary: "window" });
  },
  filters: {
    formatMoney(val) {
      let formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return formatter.format(val);
    },
  },
  created() {
    this.getProducts();
    this.getListUnit();
    this.getCategories();
  },
};
</script>

<style scoped>
.header-category {
  text-align: center;
  background-color: white;
  border-radius: 10px;
  margin: auto;
  margin-top: 2%;
}
.resource-container {
  margin-bottom: 3%;
}

.card-container {
  min-height: 100%;
  max-height: 100%;
  border-radius: 10px;
}
.card-img-top {
  width: 100%;
  object-fit: cover;
  height: 155px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-img-top:hover {
  cursor: pointer;
}
.card-title-product {
  white-space: pre-wrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  min-height: 48px;
  max-height: 48px;
  -webkit-box-orient: vertical;
}
.price {
  font-size: 25px;
  font-weight: bold;
}

.button-add-product {
  position: fixed;
  bottom: 5%;
  right: 5%;
  z-index: 1;
}

.button-add-product button {
  width: 45px;
}

.sync-price {
  margin-right: 10px;
}

.toolbar-item:hover {
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
  .modal-bottom {
    position: fixed;
    bottom: 0;
  }
  .modal-dialog {
    margin: 0;
  }
}
</style>
