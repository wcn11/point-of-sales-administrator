<template>
  <div class="home">
    <form>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">Name</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail4"
            v-model="name"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputEmail">Email</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            v-model="email"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          name="password"
          type="password"
          class="form-control"
          id="password"
          v-model="password"
        />
      </div>

      <div class="form-group">
        <label for="inputAddress">Provinsi</label>
        <select class="form-control" id="inputCabang" v-model="selectedProvince" @change="getCities()">
          <option value="" disabled selected>Pilih Provinsi</option>
          <option
            v-for="(province, index) in provinces"
            :key="index"
            :value="province"
          >
            {{ province["name"] }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="inputAddress">Kota</label>
        <select class="form-control" id="inputCabang" v-model="selectedCity">
          <option value="" disabled selected>Pilih Kota</option>
          <option
            v-for="(city, index) in cities"
            :key="index"
            :value="city"
          >
            {{ city["name"] }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="inputAddress">Cabang</label>
        <select class="form-control" id="inputCabang" v-model="selectedBranch">
          <option value="" disabled selected>Pilih Cabang</option>
          <option
            v-for="(branch, index) in branches"
            :key="index"
            :value="branch"
          >
            {{ branch["name"] }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="inputAddress">Gudang</label>
        <select
          class="form-control"
          id="inputAddress"
          v-model="selectedWarehouse"
        >
          <option value="" disabled selected>Pilih Gudang</option>
          <option v-for="(wh, index) in warehouses" :key="index" :value="wh">
            {{ wh["name"] }}
          </option>
        </select>
      </div>
      <!-- <div class="form-group">
        <label for="inputCustomerCategories">Kategori Pelanggan</label>
        <select
          class="form-control"
          id="inputCustomerCategories"
          v-model="selectedCustomerCategory"
        >
          <option value="" disabled selected>Pilih Kategori</option>
          <option
            v-for="(cc, index) in customerCategories"
            :key="index"
            :value="cc"
          >
            {{ cc["name"] }}
          </option>
        </select>
      </div> -->
      <div class="form-group">
        <label for="inputCustomerDefault">Default Pelanggan</label>
        <select
          class="form-control"
          id="inputCustomerDefault"
          v-model="selectedCustomerDefault"
        >
          <option value="" disabled selected>Pilih Pelanggan</option>
          <option
            v-for="(cd, index) in customersDefault"
            :key="index"
            :value="cd"
          >
            {{ cd["name"] }}
          </option>
        </select>
      </div>
      <!-- <div class="form-group">
        <label for="inputGlAccount">Akun Perkiraan</label>
        <select
          class="form-control"
          id="inputGlAccount"
          v-model="selectedGlAccount"
        >
          <option value="" disabled selected>Pilih Akun Perkiraan</option>
          <option
            v-for="(glaccount, index) in glaccounts"
            :key="index"
            :value="glaccount"
          >
            {{ glaccount["name"] }}
          </option>
        </select>
      </div> -->
      <!-- <div class="form-group">
        <label for="commission">Komisi</label>
        <input
          name="commission"
          id="commission"
          class="form-control"
          v-model.number="commission"
        />
      </div> -->

      <div class="custom-control custom-switch">
        <p>Aktifkan Pengguna</p>
        <input
          type="checkbox"
          class="custom-control-input"
          id="customSwitch1"
          v-model="is_active"
        />
        <label class="custom-control-label" for="customSwitch1">{{
          is_active | isActive
        }}</label>
      </div>

      <div class="custom-control custom-switch">
        <p>Pengguna Adalah Admin ?</p>
        <input
          type="checkbox"
          class="custom-control-input"
          id="customSwitch2"
          v-model="is_admin"
        />
        <label class="custom-control-label" for="customSwitch2">{{
          is_admin | isActive
        }}</label>
      </div>
      <div class="form-group text-center">
        <a href="javascript:void(0)" @click="saveUser" class="btn btn-success"
          >simpan pengguna</a
        >
      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
// import $ from 'jquery'

export default {
  name: "UserAdd",
  components: {},
  data() {
    return {
      user: [],
      provinces: [],
      cities: [],
      warehouses: [],
      customersDefault: [],
      branches: [],

      name: "",
      email: "",
      password: "",
      selectedProvince: '',
      selectedCity: '',
      selectedBranch: "",
      selectedWarehouse: "",
      // selectedCustomerCategory: "",
      selectedCustomerDefault: "",
      // selectedGlAccount: "",
      is_active: false,
      is_admin: false,
    };
  },
  methods: {
    getProvince() {
        return this.$http
          .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/provinces-lists`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          })
          .then((results) => {
            if (results["data"]["success"]) {
              if (results["data"]["data"]) {
                this.provinces = results["data"]["data"];
              }
            }
          })
          .catch((error) => {
            this.$alertify.error(error.response["data"]["message"]);
          });
    },
    getCities() {
        return this.$http
          .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/cities-lists/${this.selectedProvince['id']}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          })
          .then((results) => {
            if (results["data"]["success"]) {
              if (results["data"]["data"]) {
                this.cities = results["data"]["data"];
              }
            }
          })
          .catch((error) => {
            this.$alertify.error(error.response["data"]["message"]);
          });
    },
    getBranches() {
        return this.$http
          .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/branches-lists`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          })
          .then((results) => {
            if (results["data"]["success"]) {
              if (results["data"]["data"]["s"]) {
                this.branches = results["data"]["data"]["d"];
              } else {
                results["data"]["data"]["d"].map((value) => {
                  this.$alertify.error(value);
                });
              }
            }
          })
          .catch((error) => {
            this.$alertify.error(error.response["data"]["message"]);
          });
    },
    getListWarehouse() {
      if (this.warehouses.length <= 0) {
        return this.$http
          .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/warehouse-lists`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          })
          .then((results) => {
            if (results["data"]["success"]) {
              if (results["data"]["data"]["s"]) {
                this.warehouses = results["data"]["data"]["d"];
              } else {
                results["data"]["data"]["d"].map((value) => {
                  this.$alertify.error(value);
                });
              }
            }
            // if (results["data"]["success"]) {
            //   this.warehouses = results["data"]["data"];
            // }
          })
          .catch((error) => {
            this.$alertify.error(error.response["data"]["data"]["d"]);
          });
      }
    },
    getListCustomersDefault() {
      if (this.customersDefault.length <= 0) {
        return this.$http
          .get(
            `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/customer-default-lists`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
              },
            }
          )
          .then((results) => {
            if (results["data"]["success"]) {
              if (results["data"]["data"]["s"]) {
                this.customersDefault = results["data"]["data"]["d"];
              } else {
                results["data"]["data"]["d"].map((value) => {
                  this.$alertify.error(value);
                });
              }
            }
          })
          .catch((error) => {
            this.$alertify.error(error.response["data"]["message"]);
          });
      }
    },
    saveUser() {
      return this.$http
        .post(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/user`,
          {
            name: this.name,
            email: this.email,
            password: this.password,
            selectedProvince: this.selectedProvince,
            selectedCity: this.selectedCity,
            selectedBranch: this.selectedBranch,
            selectedWarehouse: this.selectedWarehouse,
            selectedCustomerDefault: this.selectedCustomerDefault,
            is_active: this.is_active,
            is_admin: this.is_admin,
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

            this.$router.push({
              name: "databaseUser",
            });
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["data"]["d"]);
        });
    },
  },

  filters: {
    isActive(active) {
      return active === 1 || active === true ? "Aktif" : "Non-Aktif";
    },
  },
  created() {
    this.getProvince()
    // this.getCities();
    this.getBranches();
    this.getListWarehouse();
    this.getListCustomersDefault();
  },
};
</script>
