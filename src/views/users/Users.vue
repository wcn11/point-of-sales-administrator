<template>
  <div class="home">
    <div class="wrapper">
      <header class="text-center">
        <h3>Konfigurasi Admin</h3>
      </header>

      <!-- <div class="row flexbox conf-container overflow-hidden">
        <div class="col-sm-6 card-col">
          <router-link :to="{ name: 'items' }" class="text-decoration-none">
            <div class="card bg-success card card-container">
              <p class="font-weight-bold">Jumlah Barang 
            <span class="badge badge-danger">segera</span></p> 
              <span>xxx</span>
            </div>
          </router-link>
        </div>
        <div class="col-md-6 card-col">
          <div class="card bg-info card-container">
            <p class="font-weight-bold">Update Harga Terakhir 
            <span class="badge badge-danger">segera</span></p>
            <span>20:30, 2 September 2021</span>
          </div>
        </div>
        <div class="col-md-6 card-col">
          <div class="card bg-primary card-container">
            <p class="font-weight-bold">Jumlah Barang</p>
            <span>56 Item</span>
          </div>
        </div>
        <div class="col-md-6 card-col">
          <div class="card bg-warning card-container">
            <p class="font-weight-bold">Jumlah Barang</p>
            <span>56 Item</span>
          </div>
        </div>
      </div> -->
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="m-auto ">
          <button
            class="btn btn-info mr-1"
            id="btn-update-mass-price"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Update Masal Seluruh Harga Produk"
            disabled
          >
            <i class="fad fa-usd-circle"></i> Mass Update Harga
            <span class="badge badge-danger">segera</span>
          </button>
          <router-link
          :to="{name: 'UserAdd'}"
            class="btn btn-warning mr-1"
            id="btn-update-mass-price"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Update Masal Seluruh Harga Produk"
          >
            <i class="fad fa-usd-circle"></i> tambah mitra
          </router-link>
          <router-link :to="{ name: 'category' }" class="text-decoration-none btn btn-dark"
            id="btn-update-mass-price"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Update Masal Seluruh Harga Produk"
          >
            <i class="fad fa-box-usd"></i> Pengaturan Produk
          </router-link>
        </div>
      </div>
      <!-- <div class="col-md-2">
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
      </div> -->
    </div>
    <div class="table-responsive">
      <table class="table table-borderless table-hover">
        <thead>
          <tr class="text-nowrap">
            <th>ID</th>
            <th>Nama</th>
            <th>Cabang</th>
            <th>Gudang</th>
            <th>Status Aktif</th>
            <th>Admin</th>
            <th>Ubah Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="text-nowrap">
            <td>
              {{ user["id"] }}
            </td>
            <td>
              {{ user["name"] }}
            </td>
            <td>
              {{ user["branch_name"] }}
            </td>
            <td>
              {{ user["warehouse_name"] }}
            </td>
            <td>
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  @click="updateStatusUser(user['id'])"
                  :id="`switchActive-${user['id']}`"
                  v-model="user['is_active']"
                />
                <label
                  class="custom-control-label"
                  :for="`switchActive-${user['id']}`"
                  >{{ user["is_active"] | isActive }}</label
                >
              </div>
            </td>
            <td>
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  @click="updateStatusAdmin(user['id'])"
                  :id="`switch-${user['id']}`"
                  v-model="user['is_admin']"
                />
                <label
                  class="custom-control-label"
                  :for="`switch-${user['id']}`"
                  >{{ user["is_admin"] | isActive }}</label
                >
              </div>
            </td>
            <td>
              <button
                @click="editUser(user['id'])"
                type="button"
                class="btn btn-outline-warning"
              >
                ubah
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import $ from 'jquery'

export default {
  name: "Users",
  components: {},
  data() {
    return {
      users: [],
    };
  },
  methods: {
    sync() {
      return this.$http
        .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/sync`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
          },
        })
        .then((results) => {
          console.log(results)
          // if (results["data"]["success"]) {
          //   this.users = results["data"]["data"];
          // }
        })
        .catch((error) => {
          console.log(error.response);
          this.$alertify.error(error.response["data"]["message"]);
        });
    },
    getUsers() {
      return this.$http
        .get(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/users`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
          },
        })
        .then((results) => {
          if (results["data"]["success"]) {
            this.users = results["data"]["data"];
          }
        })
        .catch((error) => {
          console.log(error.response);
          this.$alertify.error(error.response["data"]["message"]);
        });
    },
    editUser(id) {
      this.$router.push({
        path: `/user/edit/${id}`,
      });
    },
    updateStatusUser(id) {
      let status = this.users.filter((user) => user["id"] === id);

      return this.$http
        .put(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/users/active`,
          {
            user_id: id,
            is_active: !status[0]["is_active"],
            is_admin: !status[0]["is_admin"],
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          }
        )
        .then((results) => {
          console.log(results);
          if (results["data"]["success"]) {
            this.$alertify.success(results["data"]["message"]);
          }
        })
        .catch((error) => {
          console.log(error.response);
          this.$alertify.error(error.response["data"]["message"]);
        });
    },
    updateStatusAdmin(id) {
      let status = this.users.filter((user) => user["id"] === id);

      return this.$http
        .put(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/users/admin`,
          {
            user_id: id,
            is_admin: !status[0]["is_admin"],
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          }
        )
        .then((results) => {
          console.log(results);
          if (results["data"]["success"]) {
            this.$alertify.success(results["data"]["message"]);
          }
        })
        .catch((error) => {
          console.log(error.response);
          this.$alertify.error(error.response["data"]["message"]);
        });
    },
  },
  filters: {
    isActive(active) {
      return active === 1 || active === true ? "Aktif" : "Non-Aktif";
    },
  },
  created() {
    this.getUsers();
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
</style>
