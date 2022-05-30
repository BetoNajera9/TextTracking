<template>
	<div :class="{ 'side-bar': 'side-bar', active: isActive }">
		<div class="logo-content">
			<div class="logo">
				<div class="logoname">Marce's Project</div>
			</div>
			<mdicon name="menu" id="btn-menu" @click="setActive" />
		</div>
		<ul class="navlist">
			<li>
				<a href="#">
					<mdicon class="icon" name="home" />
					<span class="link-name">Inicio</span>
				</a>
				<span class="tooltip">Inicio</span>
			</li>
			<li>
				<a href="#">
					<mdicon class="icon" name="account" />
					<span class="link-name">Clientes</span>
				</a>
				<span class="tooltip">Clientes</span>
			</li>
			<li>
				<a href="#">
					<mdicon class="icon" name="cart" />
					<span class="link-name">Ventas</span>
				</a>
				<span class="tooltip">Ventas</span>
			</li>
			<li>
				<a href="#">
					<mdicon class="icon" name="store" />
					<span class="link-name">Almacen</span>
				</a>
				<span class="tooltip">Almacen</span>
			</li>
			<li>
				<a href="#">
					<mdicon class="icon" name="history" />
					<span class="link-name">Historial</span>
				</a>
				<span class="tooltip">Historial</span>
			</li>
			<li>
				<a href="#">
					<mdicon class="icon" name="file-account" />
					<span class="link-name">Estados de cuenta</span>
				</a>
				<span class="tooltip">Estados de cuenta</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data: () => ({
		isActive: false,
	}),

	props: {
		getActive: Function,
	},
	methods: {
		setActive() {
			this.isActive = !this.isActive
			this.getActive(this.isActive)
		},
	},
}
</script>

<style scoped>
.side-bar {
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 50px;
	padding: 6px 14px;
	box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
	transition: all 0.5s ease;
}

.side-bar.active {
	width: 210px;
}

.side-bar .logo-content .logo {
	color: #000;
	display: flex;
	height: 50px;
	width: 100%;
	align-items: center;
	opacity: 0;
	pointer-events: none;
	transition: all 0.3s ease;
}

.side-bar.active .logo-content .logo {
	opacity: 1;
	pointer-events: none;
}

.logo-content .logo .logo-name {
	font-size: 20px;
	font-weight: 400;
	transition: all 0.5s ease;
}

.side-bar #btn-menu {
	position: absolute;
	left: 50%;
	top: 6px;
	font-size: 20px;
	height: 50px;
	width: 50px;
	text-align: center;
	line-height: 50px;
	transform: translateX(-50%);
	transition: all 0.5s ease;
	cursor: pointer;
}

.side-bar.active #btn-menu {
	left: 90%;
}

.side-bar ul {
	margin-top: 20px;
	padding: 0px;
}

.side-bar ul li {
	position: relative;
	height: 50px;
	width: 100%;
	margin: 0 0px;
	list-style: none;
	line-height: 50px;
}

.side-bar ul li .tooltip {
	position: absolute;
	left: 122px;
	top: 0;
	transform: translate(-50%, -50%);
	border-radius: 6px;
	height: 35px;
	width: 122px;
	background: #000;
	color: #fff;
	line-height: 35px;
	text-align: center;
	box-shadow: 0 5px 10px rgba(255, 255, 255, 0.2);
	transition: 0s;
	opacity: 0;
	pointer-events: none;
	display: block;
}

.side-bar.active ul li .tooltip {
	display: none;
}

.side-bar ul li:hover .tooltip {
	transition: all 0.5s ease;
	opacity: 1;
	top: 50%;
}

.side-bar ul li a {
	color: #000;
	display: flex;
	align-items: center;
	text-decoration: none;
	transition: all 0.2s ease;
	border-radius: 12px;
	white-space: nowrap;
}

.side-bar ul li a:hover {
	background: #000;
	color: #fff;
}

.side-bar ul li a .icon {
	height: 50px;
	min-width: 50px;
	border-radius: 12px;
	line-height: 50px;
	text-align: center;
}

.side-bar .link-name {
	opacity: 0;
	pointer-events: none;
	transition: all 0.5s ease;
}

.side-bar.active .link-name {
	opacity: 1;
	pointer-events: auto;
}
</style>
