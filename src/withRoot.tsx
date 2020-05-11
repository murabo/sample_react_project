import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import * as React from "react";

// A theme with custom primary and secondary color.
// It's optional.
export const theme = createMuiTheme({
	palette: {
		primary: {
			light: "#c8e6c9",
			main: "#2EB964",
			dark: "#388e3c",
			contrastText: "#fff",
		},
		secondary: {
			light: "#fff9c4",
			main: "#ffeb3b",
			dark: "#f9a825",
			contrastText: "#fff",
		},
	},
    overrides: {
		MuiDivider: {
			root: {
				backgroundColor: "#E2E9E5"
			}
		},
		MuiTooltip: {
			tooltip: {
				fontSize: 12
			},
			popper :{
				fontSize: 18
			},
		},
		MuiButton: {
			contained: {
				boxShadow: 'none',
				'&:hover': {
					boxShadow: 'none',
				}
			},
			outlined: {
				border: '1px solid #E2E9E5',
				background: '#fff',
				//opacity: '0.7',
				'&:hover': {
					opacity: 0.9
				}
			},
			sizeLarge: {
				fontSize: 14,
				padding: '5px 12px',
				minHeight: 40,
				fontWeight: "bold"
			},
			sizeSmall: {
				fontSize: '1.2rem',
			},
			label: {
				whiteSpace: 'nowrap'
			},
			root: {
				boxSizing: "border-box",
				color: '#909491'
			},
		},
		MuiInputBase: {
			input: {
				background: '#fff',
				fontSize: 14,
				lineHeight: '1.8',
				color: '#6D7470',
				'&:disabled': {
					background: "#ddd"
				}
			},
			root: {
				background: '#fff',
			}
		},
		MuiInputLabel: {
			root: {
				color: '#6d7470'
			}
		},
		MuiInput: {
			underline: {
				'&:before': {
					content: ""
				},
				'&:after': {
					borderBottom: 'none'
				}
			}
		},
		MuiButtonBase: {
			root: {
				fontSize: '1.4rem',
				color: '#2EB964'
			},
		},
		MuiLink: {
			root: {
				fontSize: 12,
				fontWeight: "normal",
				textDecoration: "underline"
			},
		},
		MuiList: {
			padding: {
				paddingTop: 0,
				paddingBottom: 0,
			}
		},
		MuiListItem: {
			root: {
				'&$selected': {
					backgroundColor: '#F3F7F4',
				}
			},
			button: {
				'&:hover': {
					backgroundColor: '#E3F5EA',
				}
			},
			gutters: {
				paddingRight: 10,
				paddingLeft: 10
			},
		},
		MuiListItemText: {
			primary: {
				color: '#2EB964'
			},
			root: {
				margin: 0
			}
		},
		MuiListItemIcon: {
			root: {
				minWidth: 30,
				marginRight: 10,
				display: 'block',
				position: 'relative',
				top: '0.5rem',
			}
		},
		MuiCard: {
			root: {
				border: "1px solid #E2E9E5"
			}
		},
		MuiTypography: {
			root: {
				color: '#616763',
				fontWeight: 'bold',
			},
			caption: {
				fontSize: 14,
			},
			h1: {
				fontSize: 22,
				fontWeight: 'bold',
				marginBottom: 10
			},
			h2: {
				fontSize: 22,
				fontWeight: 'bold',
				marginBottom: 10
			},
			body1: {
				fontSize: 14
			},
			body2: {
				fontSize: 12
			},
			h6: {
				fontSize: 14,
				fontWeight: 'bold',
				color: '#6D7470',
			},
			gutterBottom: {
				marginBottom: 20
			},
			colorError: {
				marginLeft: 10,
				color: "#E95050"
			}
		},
		MuiChip: {
			root: {
				height: 22
			},
			deleteIcon: {
				height: 15
			}
		},
		MuiTabs: {
			root: {
				borderBottom: '1px solid #E2E9E5',
				background: '#fff'
			}
		},
		MuiTab: {
			root: {
				minWidth: '9.6rem',
				fontSize: 14,
				'@media (min-width: 960px)': {
					fontSize: 14,
				}
			},
			textColorPrimary: {
				color: '#6d7470'
			}
		},
		MuiIconButton: {
			// root: {
			// 	minWidth: 30,
			// 	minHeight: 30,
			// 	maxWidth: 30,
			// 	maxHeight: 30,
			// }
			edgeEnd: {
				marginRight: 0
			}
		},
		MuiOutlinedInput: {
			multiline: {
				padding: 10,
				lineHeight: 1.4
			},
			root: {
				'&:focused': {
					"&$focused": {
						borderColor: "#E2E9E5"
					}
				}
			},
			notchedOutline: {
				borderColor: "#E2E9E5"
			},
			input: {
				padding: 10
			},
		},
		MuiMenuItem: {
			root: {
				minWidth: '10rem',
				fontSize: '1.4rem',
				minHeight: 'auto',
				color: '#6D7470'
			}
		},
		MuiSelect: {
			root: {
				display: "flex",
			},
			select: {
				backgroundColor: 'inherit',
				lineHeight: 1.5,
				minHeight: 25
			},
			icon: {
				top: "calc(50% - 7px)",
				color: "#2EB964"
			}
		},
		MuiDialog: {
			paperWidthSm: {
				maxWidth: 1000,
				overflow: "hidden"
			}
		},
		MuiDialogActions: {
			root: {
				borderTop: '1px solid #E2E9E5'
			},
			// spacing: {
			// 			// 	'& > * + *': {
			// 			// 		marginLeft:  8,
			// 			// 	},
			// 			// }
		},
		MuiDialogTitle: {
			root: {
				minHeight: 62,
				borderBottom: '1px solid #E2E9E5;',
				background: '#F3F7F4',
				display: 'flex',
				alignItems: 'center',
				padding: '0 20px'
			},
		},
		MuiTextField: {
			root: {
				width: '100%'
			}
		},
		MuiTable: {
			root: {
				display: "block",
				overflowX: "scroll",
				whiteSpace: "nowrap",
				marginBottom: 20
			}
		},
		MuiTableCell: {
			root: {
				fontSize: 12,
			},
			head: {
				fontSize: 12,
			}
		},
		MuiExpansionPanel: {
			root: {
				border: '1px solid #E9EFEB',
				borderRadius: 4,
				'&$expanded': {
					margin: 0
				}
			}
		},
		MuiExpansionPanelDetails: {
			root: {
				display: "block",
				padding: '10px 0'
			}
		},
		MuiExpansionPanelSummary: {
			root: {
				flexDirection: 'row-reverse',
				padding: '0 10px 0 10px',
				minHeight: 44,
				'&$expanded': {
					minHeight: 44
				}
			},
			content: {
				alignItems: 'center',
				paddingLeft: '10px',
				margin: 0,
				'&$expanded': {
					margin: 0,
					padding: 10
				}
			},
			expandIcon: {
				padding: 0
			}
		},
		MuiFormControlLabel: {
			label: {
				fontSize: 14,
			}
		},
		MuiCheckbox: {

		},
		MuiStepIcon: {
			root: {
				width: 28,
				height: 28,
				color: '#e3f5ea'
			},
			text: {
				fontSize: 13
			}
		},
		MuiStepLabel: {
			label: {
				color: "#D5F1E0",
				fontWeight: "bold",
				fontSize: 16,
				'&$active': {
					color: "#2eb964",
					fontWeight: "bold",
				},
				'&$completed': {
					color: "#2eb964",
					fontWeight: "bold",
				}
			},
		}
	},

});

function withRoot(Component: any) {
	function WithRoot(props: object) {
		// MuiThemeProvider makes the theme available down the React tree
		// thanks to React context.
		return (
			<MuiThemeProvider theme={theme}>
				{/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Component {...props} />
			</MuiThemeProvider>
		);
	}

	return WithRoot;
}

export default withRoot;
