<template>

    <nav class="navbar navbar-expand-lg navbar-light bg-light p-4">
        <a class="navbar-brand" href="/">
            <!-- POS Mitra PT. BAC -->
            <img class="img-fluid" :src="require('./../assets/logo_admin_navigasi.png')"/>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto w-100">
                <!-- <li class="nav-item active">
                    <a class="nav-link" href="/"><i class="fad fa-warehouse-alt"></i> Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'customers'}"><i class="fad fa-users-class"></i> Pelanggan</router-link>
                </li>

                <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'stock'}"><i class="fad fa-box"></i> Persediaan</router-link>
                </li>

                <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'sales_report'}"><i class="fad fa-file-chart-line"></i> Laporan Penjualan</router-link>
                </li> -->

            </ul>
            <div class="text-left d-flex">

                <!-- <button class="btn btn-default d-flex justify-content-center" @click="openCart">
                    <i class="fad fa-cart-plus"></i>
                    {{ carts ? carts.length : 0 }}
                </button> -->

                <a href="javascript:void(0)" class="btn btn-default" @click="logout">                
                    logout
                </a>
            </div>
        </div>

    </nav>
</template>

<script>
import axios from "axios"

export default {
    name: "navigation",
    methods: {
        logout(){
            
            axios.post(`${process.env.VUE_APP_BASE_HOST_API_ADMIN}/logout`,{},{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt-admin')}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                
            }).then( function(result) {

                console.log(result)

                if(result.data.message){
                    localStorage.removeItem('jwt-admin', "")
                    window.location.href = "/login"
                }
            })
        },
    },
}
</script>

<style scoped>

    .navbar{
        padding: 1%;
        border-bottom-left-radius: 15%;
        border-bottom-right-radius: 15%;
    }

    .navbar-brand img{
        width: 50%;
    }

    @media only screen and (max-width: 600px) {
        .navbar-brand img{
            width: 200px;
        }

        .navbar-brand{
            width: 50%;
        }
    }

</style>
