<template>
	<div class="image-upload">
		<label class="div1">{{ label }}</label>
		<div class="div2 imagepreview" :style="`background-image: url(${localvalue})`" />
		<div class="div3">
				<input type="text" v-model="localvalue" />
		</div>
		<label class="div4">Plaatje</label>
		<div class="div5">
			<input
				type= "file"
				ref = "file"
				id  = "file"
				v-on:change="changed($event)"
			/>
		</div>
	</div>
	
</template>
<style>
	.image-upload {
		display: grid;
		grid-template-columns: 20% 100px 1fr;
		grid-template-rows: 34px 1fr 36px;
		grid-column-gap: 8px;
		grid-row-gap: 0px;
	}
	.image-upload .div1 { grid-area: 1 / 1 / 4 / 2; justify-self: flex-end;}
	.image-upload .div2 { grid-area: 1 / 2 / 4 / 3; }
	.image-upload .div3 { grid-area: 1 / 3 / 2 / 4; }
	.image-upload .div4 { grid-area: 2 / 3 / 3 / 4; align-self: flex-end; height: 20px;}
	.image-upload .div5 { grid-area: 3 / 3 / 4 / 4; }

	.image-upload .div3 input,
	.image-upload .div5 input {
		width:100%;
	}

</style>
<script>
	export default {
		name: 'ImageInput',
		props: {
			lblen:      { type: [String,Number], default: null },
			label:      { type: [String,Number], default: null },
			modelValue: { type: [String,Number], default: '' },
		},

		data() {
			// todo: get these from "USER"...
			// Authorization: Client-ID YOUR_CLIENT_ID
			// https://i.imgur.com/xwQv9wC.jpg
			return {
				client_id: localStorage.getItem('japan.imgurid'),
			}
		},

		methods: {
			changed(event) {
				const file = document.getElementById("file")
				const img  = document.getElementById("img")
				const url  = document.getElementById("url")
				const formdata = new FormData()
				formdata.append("image", event.target.files[0])
				fetch("https://api.imgur.com/3/image/", {
					method: "post",
					headers: {
						Authorization: `Client-ID ${this.client_id}`,
					},
					referrer: "",
					body: formdata
				}).then(data => data.json()).then(data => {
					this.localvalue = data.data.link
				})

			}
		},

		computed: {
			prelabel() {
				return this.lblen ? `row-${this.lblen}` : null
			},

			localvalue: {
				get() {
					return this.modelValue
				},
				set(newValue) {
					this.$emit('update:modelValue', newValue)
				}
			},
		},
	}
</script>