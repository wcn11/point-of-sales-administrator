<template>
  <div class="home">
    <div class="wrapper">
      <header class="text-center">
        <h3>Konfigurasi Admin</h3>
      </header>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="m-auto">
          <!-- <button
            class="btn btn-info mr-1"
            id="btn-update-mass-price"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Update Masal Seluruh Harga Produk"
            disabled
          >
            <i class="fad fa-usd-circle"></i> Mass Update Harga
            <span class="badge badge-danger">segera</span>
          </button> -->
          <router-link
            :to="{ name: 'UserAdd' }"
            class="btn btn-warning mr-1"
            id="btn-update-mass-price"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Buat Mitra Baru"
          >
            <i class="fad fa-usd-circle"></i> tambah mitra
          </router-link>
          <router-link
            :to="{ name: 'category' }"
            class="text-decoration-none btn btn-dark mr-1"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Pengaturan Produk"
          >
            <i class="fad fa-box-usd"></i> Pengaturan Produk
          </router-link>
          <!-- <router-link
            :to="{ name: 'category' }"
            class="text-decoration-none btn btn-danger mr-1"
            id="btn-update-mass-price"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Stok Yang Segera Harus Di Update"
          >
            <i class="fad fa-box-usd"></i> Stok Kurang (2)
          </router-link> -->
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
            <th>Pusat</th>
            <th>Admin</th>
            <th>Ubah Detail</th>
            <th>Produk Pilihan</th>
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
                  @click="updateDefaultUser(user)"
                  :id="`switchDefault-${user['id']}`"
                  v-model="user['is_default']"
                />
                <label
                  class="custom-control-label"
                  :for="`switchDefault-${user['id']}`"
                  >{{ user["is_default"] | isDefault }}</label
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
                    @click="editUser(user['id'])"
                    >Ubah Mitra</a
                  >
                  <a
                    class="dropdown-item"
                    href="javascript:void(0)"
                    @click="deleteUser(user['id'])"
                    >Hapus Mitra</a
                  >
                  <div class="dropdown-divider"></div>
                  <a
                    class="dropdown-item"
                    href="javascript:void(0)"
                    @click="editPassword(user['id'])"
                    >Ubah Password</a
                  >
                </div>
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
                  Lainnya
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'offer', params: { userId: user['id'] } }"
                    >Penawaran</router-link
                  >
                  <div class="dropdown-divider"></div>
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'promo', params: { userId: user['id'] } }"
                    >Promo</router-link
                  >
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'push', params: { userId: user['id'] } }"
                    >Notifikasi (Uji Coba)</router-link
                  >
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modal-remove-user"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">Hapus Mitra</h5>
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
              Menghapus mitra sama saja menghapus seluruh data terkait mitra
              tersebut. <br />
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
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              tutup
            </button>
            <button type="button" class="btn btn-danger" @click="removeUser()">
              Ya, saya mengerti
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modal-edit-password"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-warning">
            <h5 class="modal-title" id="exampleModalLabel">Ubah Password</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              tutup
            </button>
            <button type="button" class="btn btn-warning">
              update password
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import $ from "jquery";

export default {
  name: "Users",
  components: {},
  data() {
    return {
      users: [],
      selectedUser: {
        user: {
          data: "",
          error: false,
          errorMessage: "",
          additionalData: [],
        },
        password: {
          data: "",
          error: false,
          errorMessage: "",
          additionalData: [],
        },
      },
    };
  },
  methods: {
    editPassword(id) {
      this.selectedUser["user"]["data"] = id;
      $("#modal-edit-password").modal("show");
    },
    deleteUser(id) {
      this.selectedUser["user"]["data"] = id;
      $("#modal-remove-user").modal("show");
    },
    removeUser() {
      return this.$http
        .delete(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/user/${this.selectedUser["user"]["data"]}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            this.$alertify.success("Mitra Berhasil Dihapus");
            this.getUsers();
            $("#modal-remove-user").modal("hide");
          }
        })
        .catch((error) => {
          console.log(error.response);
          this.$alertify.error(error.response["data"]["message"]);
        });
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
    updateDefaultUser(user) {
      let status = this.users.filter((val) => val["id"] === user["id"]);

      if (this.users.length === 1) {
        if (status[0]["is_default"] !== 0) {
          this.$alertify.warning("Harus ada 1 mitra default");
          this.getUsers();
          return;
        }
      }

      return this.$http
        .put(
          `${process.env.VUE_APP_BASE_HOST_API_ADMIN}/users/default`,
          {
            user_id: user["id"],
            is_default: !status[0]["is_default"],
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt-admin"),
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            this.getUsers();
            this.$alertify.success(results["data"]["message"]);
          }
        })
        .catch((error) => {
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
          if (results["data"]["success"]) {
            this.$alertify.success(results["data"]["message"]);
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
        });
    },
  },
  filters: {
    isActive(active) {
      return active === 1 || active === true ? "Aktif" : "Non-Aktif";
    },
    isDefault(active) {
      return active === 1 || active === true ? "Pusat" : "Bukan Pusat";
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

.overflow-x-none {
  overflow-x: unset;
}
</style>
