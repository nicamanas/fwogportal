import { useState, useEffect } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import PeopleIcon from "@mui/icons-material/People"

import { Link, useModals, useNavigate, useParams } from "../router"
import { UserStorage } from "../utils/userLocalStorageUtils.js"

type PageRoutes = {
	[key: string]: () => void
}

type SettingsRoutes = {
	[key: string]: () => void
}

export default function ResponsiveAppBar() {
	const navigate = useNavigate()
	const modals = useModals()

	const settings: SettingsRoutes = {
		Profile: () => {
			handleCloseNavMenu()
			navigate("/profile")
		},
		Logout: () => {
			UserStorage.clearUser()
			handleCloseNavMenu()
			navigate("/")
			navigate(0)
		},
	}

	const pageRoutes: PageRoutes = {
		Home: () => navigate("/"),
		"Edit Listings": () => navigate("/editlistings"),
		"Skill Catalogue": () => navigate("/skillcatalogue"),
		"My Applications": () => navigate("/staffapplications"),
	}

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
	const [currentUser, setCurrentUser] = useState(null)

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	useEffect(() => {
		const user = UserStorage.getUser()
		setCurrentUser(user)
	}, [])

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<PeopleIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontWeight: 700,
							letterSpacing: ".2rem",
							color: "inherit",
							textDecoration: "none",
						}}>
						SBRP
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit">
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}>
							{Object.keys(pageRoutes).map((pageName) => (
								<MenuItem
									key={pageName}
									onClick={() => {
										handleCloseNavMenu()
										pageRoutes[pageName]()
									}}>
									<Typography
										textAlign="center"
										color="inherit">
										{pageName}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontWeight: 700,
							letterSpacing: ".2rem",
							color: "inherit",
							textDecoration: "none",
						}}>
						SBRP
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}>
						{Object.keys(pageRoutes).map((pageName) => {
							if (
								currentUser == null ||
								(currentUser.sys_role != "admin" &&
									[
										"Edit Listings",
										"Skill Catalogue",
									].includes(pageName))
							) {
								return null
							}
							return (
								<Button
									key={pageName}
									onClick={() => {
										handleCloseNavMenu()
										pageRoutes[pageName]()
									}}
									sx={{
										my: 2,
										display: "block",
										color: "inherit",
									}}>
									{pageName}
								</Button>
							)
						})}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="User settings">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}>
								<Avatar src="../../src/assets/cat.jpeg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}>
							{Object.keys(settings).map((setting) => (
								<MenuItem
									key={setting}
									onClick={settings[setting]}>
									<Typography textAlign="center">
										{setting}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
