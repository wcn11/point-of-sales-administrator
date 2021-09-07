<template>
  <div class="home">
    <form v-if="!showError">
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
        <!-- <input
          name="password"
          type="password"
          class="form-control"
          id="password"
          v-model="password"
        /> -->
      </div>

      <div class="form-group">
        <label for="inputAddress">Cabang</label>
        <select
          class="form-control"
          id="inputAddress"
          v-model="selectedBranch"
        >
          <option value="" disabled selected>Pilih Gudang</option>
          <option v-for="(b, index) in branches" :key="index" :value="b">
            {{ b["name"] }}
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
      <div class="form-group">
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
      </div>
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
      <div class="form-group">
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
      </div>
      <div class="form-group">
        <label for="commission">Komisi Pusat</label>
        <input
          name="commission"
          id="commission"
          class="form-control"
          v-model.number="commission"
        />
      </div>
      <div class="form-group">
        <label for="partnerCommission">Komisi Mitra</label>
        <input
          name="partnerCommission"
          id="partnerCommission"
          class="form-control"
          v-model.number="partnerCommission"
        />
      </div>

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

    <notfound v-if="showError"></notfound>
  </div>
</template>

<script>
// @ is an alias to /src
// import $ from 'jquery'
import notfound from "./../../components/notFound.vue";

export default {
  name: "UserEdit",
  components: {
    notfound,
  },
  data() {
    return {
      user: [],
      branches: [],
      warehouses: [],
      customerCategories: [],
      customersDefault: [],
      glaccounts: [],
      showError: false,

      name: "",
      email: "",
      password: "",
      selectedBranch: {},
      selectedWarehouse: {},
      selectedCustomerCategory: {},
      selectedCustomerDefault: {},
      selectedGlAccount: {},
      commission: 0,
      partnerCommission:0,
      is_active: false,
      is_admin: false,
    };
  },
  methods: {
    getUser() {
      if (this.warehouses.length <= 0) {
        return this.$http
          .get(
            `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/user/${this.$route.params.id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
              },
            }
          )
          .then((results) => {
            if (results["data"]["success"]) {
              let user = results["data"]["data"];
              this.user = user;

              this.name = user["name"];
              this.email = user["email"];
              this.selectedWarehouse = user;
              this.commission = user["commission"];
              this.partnerCommission = user["partnerCommission"];
              this.is_active = user["is_active"];
              this.is_admin = user["is_admin"];
            }
          })
          .catch((error) => {
            this.$alertify.error(error.response["data"]["message"]);
            this.showError = !this.showError;
          });
      }
    },
    getListBranch() {
      if (this.branches.length <= 0) {
        return this.$http
          .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/branches-lists`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          })
          .then((results) => {
            if (results["data"]["success"]) {
              this.branches = results["data"]["data"];

              let user = {
                id: this.user["branch_id"],
                name: this.user["branch_name"],
              };

              this.branches.push(user);
              this.selectedBranch = user;
            }
          })
          .catch((error) => {
            this.$alertify.error(error.response["data"]["data"]["d"]);
          });
      }
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
              this.warehouses = results["data"]["data"];

              let user = {
                id: this.user["warehouse_id"],
                name: this.user["warehouse_name"],
              };

              this.warehouses.push(user);
              this.selectedWarehouse = user;
            }
          })
          .catch((error) => {
            this.$alertify.error(error.response["data"]["data"]["d"]);
          });
      }
    },
    getListCustomersCategory() {
      if (this.customerCategories.length <= 0) {
        return this.$http
          .get(
            `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/customer-category-lists`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
              },
            }
          )
          .then((results) => {
            if (results["data"]["success"]) {
              this.customerCategories = results["data"]["data"];

              let user = {
                id: this.user["customer_category_id"],
                name: this.user["customer_category_name"],
              };

              this.customerCategories.push(user);
              this.selectedCustomerCategory = user;
            }
          })
          .catch((error) => {
            this.$alertify.error(error.response["data"]["message"]);
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
              this.customersDefault = results["data"]["data"];

              let user = {
                id: this.user["customer_no_default"],
                name: this.user["customer_name_default"],
              };

              this.customersDefault.push(user);
              this.selectedCustomerDefault = user;
            }
          })
          .catch((error) => {
            this.$alertify.error(error.response["data"]["message"]);
          });
      }
    },
    getGlaccount() {
      if (this.glaccounts.length <= 0) {
        return this.$http
          .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/glaccount-lists`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          })
          .then((results) => {
            if (results["data"]["success"]) {
              this.glaccounts = results["data"]["data"];

              this.selectedGlAccount['id'] = this.user["glaccount_id"]
              this.selectedGlAccount['no'] = this.user["glaccount_no"]
              this.selectedGlAccount['name'] = this.user["glaccount_name"]

            }
          })
          .catch((error) => {
            this.$alertify.error(error.response["data"]["message"]);
          });
      }
    },
    saveUser() {
      return this.$http
        .put(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/user/${this.$route.params["id"]}`,
          {
            name: this.name,
            email: this.email,
            selectedBranch: this.selectedBranch,
            selectedWarehouse: this.selectedWarehouse,
            selectedCustomerCategory: this.selectedCustomerCategory,
            selectedCustomerDefault: this.selectedCustomerDefault,
            selectedGlAccount: this.selectedGlAccount,
            commission: this.commission,
            partnerCommission: this.partnerCommission,
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
    this.getUser();
    this.getListBranch();
    this.getListWarehouse();
    this.getListCustomersCategory();
    this.getListCustomersDefault();
    this.getGlaccount();
  },
};
</script>
