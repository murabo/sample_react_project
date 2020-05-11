const styleFlex =
	`
	.app-row {
		display: flex;
		justify-content: flex-start;
		align-items: stretch;
		flex-wrap: nowrap;
		padding-top: 10px;
		padding-right: 10px;
		padding-bottom: 10px;
		padding-left: 10px;
   } 
   .app-cell {
		min-height: 10px !important;
		flex-grow: 1;
	}
    `;

export const Template = [
	{
		title: "ヘッダー",
		content: `
            <div class="app-row" style="padding: 10px; flex-wrap: nowrap">
                <div class="app-cell">
                    <div style="color: #333; font-weight:bold; margin-top: 5px; font-size: 15px;">PressRelease</div>
                </div>
                <div class="app-cell" style="margin-left: auto; text-align: right">
                    <img width="200" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTciIGhlaWdodD0iNTMiIHZpZXdCb3g9IjAgMCA5NyA1MyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk3IiBoZWlnaHQ9IjUzIiBmaWxsPSIjRTVFNUU1Ii8+CjxyZWN0IHdpZHRoPSI5NyIgaGVpZ2h0PSI1MyIgZmlsbD0iI0M0QzRDNCIvPgo8cGF0aCBkPSJNMjMuODM1OSAzNVYxNy42MjVIMjUuOTM1OUwyNS44MTA5IDMzLjEyNUwzMi4wODU5IDMzLjA3NVYzNUgyMy44MzU5Wk00Mi41Nzk5IDM0LjkyNUM0MS44NjMyIDM1LjE5MTcgNDEuMDI5OSAzNS4zMjUgNDAuMDc5OSAzNS4zMjVDMzkuMTI5OSAzNS4zMjUgMzguMjk2NiAzNS4xOTE3IDM3LjU3OTkgMzQuOTI1QzM2Ljg2MzIgMzQuNjU4MyAzNi4xOTY1IDM0LjIgMzUuNTc5OSAzMy41NUMzNC4zMTMyIDMyLjIzMzMgMzMuNjc5OSAyOS44MDgzIDMzLjY3OTkgMjYuMjc1QzMzLjY3OTkgMjIuNzU4MyAzNC4zMTMyIDIwLjM1IDM1LjU3OTkgMTkuMDVDMzYuMTk2NSAxOC40MTY3IDM2Ljg2MzIgMTcuOTY2NyAzNy41Nzk5IDE3LjdDMzguMjk2NiAxNy40MzMzIDM5LjEyOTkgMTcuMyA0MC4wNzk5IDE3LjNDNDEuMDI5OSAxNy4zIDQxLjg2MzIgMTcuNDMzMyA0Mi41Nzk5IDE3LjdDNDMuMjk2NiAxNy45NjY3IDQzLjk2MzIgMTguNDE2NyA0NC41Nzk5IDE5LjA1QzQ1Ljg0NjYgMjAuMzUgNDYuNDc5OSAyMi43NTgzIDQ2LjQ3OTkgMjYuMjc1QzQ2LjQ3OTkgMjkuODA4MyA0NS44NDY2IDMyLjIzMzMgNDQuNTc5OSAzMy41NUM0My45NjMyIDM0LjIgNDMuMjk2NiAzNC42NTgzIDQyLjU3OTkgMzQuOTI1Wk0zNy42NTQ5IDE5LjY3NUMzNy4xMDQ5IDE5Ljk5MTcgMzYuNjc5OSAyMC42NzUgMzYuMzc5OSAyMS43MjVDMzYuMDc5OSAyMi43NTgzIDM1LjkyOTkgMjQuMTc1IDM1LjkyOTkgMjUuOTc1QzM1LjkyOTkgMjcuNzc1IDM2LjAwNDkgMjkuMTQxNyAzNi4xNTQ5IDMwLjA3NUMzNi4zMDQ5IDMxLjAwODMgMzYuNTYzMiAzMS43MjUgMzYuOTI5OSAzMi4yMjVDMzcuMzEzMiAzMi43MDgzIDM3LjczODIgMzMuMDI1IDM4LjIwNDkgMzMuMTc1QzM4LjY3MTUgMzMuMzI1IDM5LjM2MzIgMzMuNCA0MC4yNzk5IDMzLjRDNDEuMTk2NiAzMy40IDQxLjkyOTkgMzMuMjUgNDIuNDc5OSAzMi45NUM0My42NjMyIDMyLjMgNDQuMjU0OSAzMC4xIDQ0LjI1NDkgMjYuMzVDNDQuMjU0OSAyMi41NjY3IDQzLjY3MTYgMjAuMzQxNyA0Mi41MDQ5IDE5LjY3NUM0MS45NTQ5IDE5LjM1ODMgNDEuMTQ2NSAxOS4yIDQwLjA3OTkgMTkuMkMzOS4wMTMyIDE5LjIgMzguMjA0OSAxOS4zNTgzIDM3LjY1NDkgMTkuNjc1Wk01My42NjExIDMyLjdDNTQuMTI3OCAzMy4yMzMzIDU1LjAxOTUgMzMuNSA1Ni4zMzYxIDMzLjVDNTcuNjY5NSAzMy41IDU4LjY0NDUgMzMuMzc1IDU5LjI2MTEgMzMuMTI1VjI3LjYyNUw1Ni42MTExIDI3LjVWMjUuOTVINjEuMjYxMVYzNC4zNUM1OS45OTQ1IDM1IDU4LjQyNzggMzUuMzI1IDU2LjU2MTEgMzUuMzI1QzU1LjgxMTEgMzUuMzI1IDU1LjEzNjEgMzUuMjUgNTQuNTM2MSAzNS4xQzUzLjkzNjEgMzQuOTY2NyA1My4zNDQ1IDM0LjcgNTIuNzYxMSAzNC4zQzUyLjE5NDUgMzMuOSA1MS43MTk1IDMzLjM2NjcgNTEuMzM2MSAzMi43QzUwLjUwMjggMzEuMjMzMyA1MC4wODYxIDI5LjA4MzMgNTAuMDg2MSAyNi4yNUM1MC4wODYxIDIyLjY2NjcgNTAuNzE5NSAyMC4yNDE3IDUxLjk4NjEgMTguOTc1QzUyLjYxOTUgMTguMzQxNyA1My4zMTk1IDE3LjkwODMgNTQuMDg2MSAxNy42NzVDNTQuODUyOCAxNy40MjUgNTUuOTM2MSAxNy4zIDU3LjMzNjEgMTcuM0M1OC43NTI4IDE3LjMgNjAuMDI3OCAxNy40NDE3IDYxLjE2MTEgMTcuNzI1TDYwLjkxMTEgMTkuNTI1QzU5LjAyNzggMTkuMzA4MyA1Ny42MzYxIDE5LjIgNTYuNzM2MSAxOS4yQzU1LjA4NjEgMTkuMiA1NC4wNDQ1IDE5LjQyNSA1My42MTExIDE5Ljg3NUM1Mi43Nzc4IDIwLjc0MTcgNTIuMzUyOCAyMi44NSA1Mi4zMzYxIDI2LjJDNTIuMzUyOCAyOS41NjY3IDUyLjc5NDUgMzEuNzMzMyA1My42NjExIDMyLjdaTTc0LjI5MzggMzQuOTI1QzczLjU3NzEgMzUuMTkxNyA3Mi43NDM4IDM1LjMyNSA3MS43OTM4IDM1LjMyNUM3MC44NDM4IDM1LjMyNSA3MC4wMTA0IDM1LjE5MTcgNjkuMjkzOCAzNC45MjVDNjguNTc3MSAzNC42NTgzIDY3LjkxMDQgMzQuMiA2Ny4yOTM4IDMzLjU1QzY2LjAyNzEgMzIuMjMzMyA2NS4zOTM4IDI5LjgwODMgNjUuMzkzOCAyNi4yNzVDNjUuMzkzOCAyMi43NTgzIDY2LjAyNzEgMjAuMzUgNjcuMjkzOCAxOS4wNUM2Ny45MTA0IDE4LjQxNjcgNjguNTc3MSAxNy45NjY3IDY5LjI5MzggMTcuN0M3MC4wMTA0IDE3LjQzMzMgNzAuODQzOCAxNy4zIDcxLjc5MzggMTcuM0M3Mi43NDM4IDE3LjMgNzMuNTc3MSAxNy40MzMzIDc0LjI5MzggMTcuN0M3NS4wMTA0IDE3Ljk2NjcgNzUuNjc3MSAxOC40MTY3IDc2LjI5MzggMTkuMDVDNzcuNTYwNCAyMC4zNSA3OC4xOTM4IDIyLjc1ODMgNzguMTkzOCAyNi4yNzVDNzguMTkzOCAyOS44MDgzIDc3LjU2MDQgMzIuMjMzMyA3Ni4yOTM4IDMzLjU1Qzc1LjY3NzEgMzQuMiA3NS4wMTA0IDM0LjY1ODMgNzQuMjkzOCAzNC45MjVaTTY5LjM2ODggMTkuNjc1QzY4LjgxODggMTkuOTkxNyA2OC4zOTM4IDIwLjY3NSA2OC4wOTM4IDIxLjcyNUM2Ny43OTM4IDIyLjc1ODMgNjcuNjQzOCAyNC4xNzUgNjcuNjQzOCAyNS45NzVDNjcuNjQzOCAyNy43NzUgNjcuNzE4OCAyOS4xNDE3IDY3Ljg2ODggMzAuMDc1QzY4LjAxODggMzEuMDA4MyA2OC4yNzcxIDMxLjcyNSA2OC42NDM4IDMyLjIyNUM2OS4wMjcxIDMyLjcwODMgNjkuNDUyMSAzMy4wMjUgNjkuOTE4OCAzMy4xNzVDNzAuMzg1NCAzMy4zMjUgNzEuMDc3MSAzMy40IDcxLjk5MzggMzMuNEM3Mi45MTA0IDMzLjQgNzMuNjQzOCAzMy4yNSA3NC4xOTM4IDMyLjk1Qzc1LjM3NzEgMzIuMyA3NS45Njg4IDMwLjEgNzUuOTY4OCAyNi4zNUM3NS45Njg4IDIyLjU2NjcgNzUuMzg1NCAyMC4zNDE3IDc0LjIxODggMTkuNjc1QzczLjY2ODggMTkuMzU4MyA3Mi44NjA0IDE5LjIgNzEuNzkzOCAxOS4yQzcwLjcyNzEgMTkuMiA2OS45MTg4IDE5LjM1ODMgNjkuMzY4OCAxOS42NzVaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K" alt="ロゴ"  style="width: 40px;">
                    <div style="color: #333; margin-top: 5px; font-size: 13px;">YYYY.MM.DD</div>
                </div>
            </div>
             <style>
                ${styleFlex}
            </style>
            `,
	},
	{
		title: "ヘッダー",
		content: `
             <style>
                ${styleFlex}
                 .app-header-top {
                    font-size: 13px;
                    padding: 7px 10px 5px 10px;
                    text-align: right;
                    background-color: #ddd;
                    color: #fff;
                    font-weight: Bold;
                    font-style: italic;
                 }
                 .app-header-bottom {
                    height: 10px;
                    background-color: #ddd;
                 }
            </style>
           
            <p class="app-header-top">Press Release</p>
            <div class="app-row" style="padding: 10px;">
                <div class="app-cell">
                     <img width="200" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTciIGhlaWdodD0iNTMiIHZpZXdCb3g9IjAgMCA5NyA1MyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk3IiBoZWlnaHQ9IjUzIiBmaWxsPSIjRTVFNUU1Ii8+CjxyZWN0IHdpZHRoPSI5NyIgaGVpZ2h0PSI1MyIgZmlsbD0iI0M0QzRDNCIvPgo8cGF0aCBkPSJNMjMuODM1OSAzNVYxNy42MjVIMjUuOTM1OUwyNS44MTA5IDMzLjEyNUwzMi4wODU5IDMzLjA3NVYzNUgyMy44MzU5Wk00Mi41Nzk5IDM0LjkyNUM0MS44NjMyIDM1LjE5MTcgNDEuMDI5OSAzNS4zMjUgNDAuMDc5OSAzNS4zMjVDMzkuMTI5OSAzNS4zMjUgMzguMjk2NiAzNS4xOTE3IDM3LjU3OTkgMzQuOTI1QzM2Ljg2MzIgMzQuNjU4MyAzNi4xOTY1IDM0LjIgMzUuNTc5OSAzMy41NUMzNC4zMTMyIDMyLjIzMzMgMzMuNjc5OSAyOS44MDgzIDMzLjY3OTkgMjYuMjc1QzMzLjY3OTkgMjIuNzU4MyAzNC4zMTMyIDIwLjM1IDM1LjU3OTkgMTkuMDVDMzYuMTk2NSAxOC40MTY3IDM2Ljg2MzIgMTcuOTY2NyAzNy41Nzk5IDE3LjdDMzguMjk2NiAxNy40MzMzIDM5LjEyOTkgMTcuMyA0MC4wNzk5IDE3LjNDNDEuMDI5OSAxNy4zIDQxLjg2MzIgMTcuNDMzMyA0Mi41Nzk5IDE3LjdDNDMuMjk2NiAxNy45NjY3IDQzLjk2MzIgMTguNDE2NyA0NC41Nzk5IDE5LjA1QzQ1Ljg0NjYgMjAuMzUgNDYuNDc5OSAyMi43NTgzIDQ2LjQ3OTkgMjYuMjc1QzQ2LjQ3OTkgMjkuODA4MyA0NS44NDY2IDMyLjIzMzMgNDQuNTc5OSAzMy41NUM0My45NjMyIDM0LjIgNDMuMjk2NiAzNC42NTgzIDQyLjU3OTkgMzQuOTI1Wk0zNy42NTQ5IDE5LjY3NUMzNy4xMDQ5IDE5Ljk5MTcgMzYuNjc5OSAyMC42NzUgMzYuMzc5OSAyMS43MjVDMzYuMDc5OSAyMi43NTgzIDM1LjkyOTkgMjQuMTc1IDM1LjkyOTkgMjUuOTc1QzM1LjkyOTkgMjcuNzc1IDM2LjAwNDkgMjkuMTQxNyAzNi4xNTQ5IDMwLjA3NUMzNi4zMDQ5IDMxLjAwODMgMzYuNTYzMiAzMS43MjUgMzYuOTI5OSAzMi4yMjVDMzcuMzEzMiAzMi43MDgzIDM3LjczODIgMzMuMDI1IDM4LjIwNDkgMzMuMTc1QzM4LjY3MTUgMzMuMzI1IDM5LjM2MzIgMzMuNCA0MC4yNzk5IDMzLjRDNDEuMTk2NiAzMy40IDQxLjkyOTkgMzMuMjUgNDIuNDc5OSAzMi45NUM0My42NjMyIDMyLjMgNDQuMjU0OSAzMC4xIDQ0LjI1NDkgMjYuMzVDNDQuMjU0OSAyMi41NjY3IDQzLjY3MTYgMjAuMzQxNyA0Mi41MDQ5IDE5LjY3NUM0MS45NTQ5IDE5LjM1ODMgNDEuMTQ2NSAxOS4yIDQwLjA3OTkgMTkuMkMzOS4wMTMyIDE5LjIgMzguMjA0OSAxOS4zNTgzIDM3LjY1NDkgMTkuNjc1Wk01My42NjExIDMyLjdDNTQuMTI3OCAzMy4yMzMzIDU1LjAxOTUgMzMuNSA1Ni4zMzYxIDMzLjVDNTcuNjY5NSAzMy41IDU4LjY0NDUgMzMuMzc1IDU5LjI2MTEgMzMuMTI1VjI3LjYyNUw1Ni42MTExIDI3LjVWMjUuOTVINjEuMjYxMVYzNC4zNUM1OS45OTQ1IDM1IDU4LjQyNzggMzUuMzI1IDU2LjU2MTEgMzUuMzI1QzU1LjgxMTEgMzUuMzI1IDU1LjEzNjEgMzUuMjUgNTQuNTM2MSAzNS4xQzUzLjkzNjEgMzQuOTY2NyA1My4zNDQ1IDM0LjcgNTIuNzYxMSAzNC4zQzUyLjE5NDUgMzMuOSA1MS43MTk1IDMzLjM2NjcgNTEuMzM2MSAzMi43QzUwLjUwMjggMzEuMjMzMyA1MC4wODYxIDI5LjA4MzMgNTAuMDg2MSAyNi4yNUM1MC4wODYxIDIyLjY2NjcgNTAuNzE5NSAyMC4yNDE3IDUxLjk4NjEgMTguOTc1QzUyLjYxOTUgMTguMzQxNyA1My4zMTk1IDE3LjkwODMgNTQuMDg2MSAxNy42NzVDNTQuODUyOCAxNy40MjUgNTUuOTM2MSAxNy4zIDU3LjMzNjEgMTcuM0M1OC43NTI4IDE3LjMgNjAuMDI3OCAxNy40NDE3IDYxLjE2MTEgMTcuNzI1TDYwLjkxMTEgMTkuNTI1QzU5LjAyNzggMTkuMzA4MyA1Ny42MzYxIDE5LjIgNTYuNzM2MSAxOS4yQzU1LjA4NjEgMTkuMiA1NC4wNDQ1IDE5LjQyNSA1My42MTExIDE5Ljg3NUM1Mi43Nzc4IDIwLjc0MTcgNTIuMzUyOCAyMi44NSA1Mi4zMzYxIDI2LjJDNTIuMzUyOCAyOS41NjY3IDUyLjc5NDUgMzEuNzMzMyA1My42NjExIDMyLjdaTTc0LjI5MzggMzQuOTI1QzczLjU3NzEgMzUuMTkxNyA3Mi43NDM4IDM1LjMyNSA3MS43OTM4IDM1LjMyNUM3MC44NDM4IDM1LjMyNSA3MC4wMTA0IDM1LjE5MTcgNjkuMjkzOCAzNC45MjVDNjguNTc3MSAzNC42NTgzIDY3LjkxMDQgMzQuMiA2Ny4yOTM4IDMzLjU1QzY2LjAyNzEgMzIuMjMzMyA2NS4zOTM4IDI5LjgwODMgNjUuMzkzOCAyNi4yNzVDNjUuMzkzOCAyMi43NTgzIDY2LjAyNzEgMjAuMzUgNjcuMjkzOCAxOS4wNUM2Ny45MTA0IDE4LjQxNjcgNjguNTc3MSAxNy45NjY3IDY5LjI5MzggMTcuN0M3MC4wMTA0IDE3LjQzMzMgNzAuODQzOCAxNy4zIDcxLjc5MzggMTcuM0M3Mi43NDM4IDE3LjMgNzMuNTc3MSAxNy40MzMzIDc0LjI5MzggMTcuN0M3NS4wMTA0IDE3Ljk2NjcgNzUuNjc3MSAxOC40MTY3IDc2LjI5MzggMTkuMDVDNzcuNTYwNCAyMC4zNSA3OC4xOTM4IDIyLjc1ODMgNzguMTkzOCAyNi4yNzVDNzguMTkzOCAyOS44MDgzIDc3LjU2MDQgMzIuMjMzMyA3Ni4yOTM4IDMzLjU1Qzc1LjY3NzEgMzQuMiA3NS4wMTA0IDM0LjY1ODMgNzQuMjkzOCAzNC45MjVaTTY5LjM2ODggMTkuNjc1QzY4LjgxODggMTkuOTkxNyA2OC4zOTM4IDIwLjY3NSA2OC4wOTM4IDIxLjcyNUM2Ny43OTM4IDIyLjc1ODMgNjcuNjQzOCAyNC4xNzUgNjcuNjQzOCAyNS45NzVDNjcuNjQzOCAyNy43NzUgNjcuNzE4OCAyOS4xNDE3IDY3Ljg2ODggMzAuMDc1QzY4LjAxODggMzEuMDA4MyA2OC4yNzcxIDMxLjcyNSA2OC42NDM4IDMyLjIyNUM2OS4wMjcxIDMyLjcwODMgNjkuNDUyMSAzMy4wMjUgNjkuOTE4OCAzMy4xNzVDNzAuMzg1NCAzMy4zMjUgNzEuMDc3MSAzMy40IDcxLjk5MzggMzMuNEM3Mi45MTA0IDMzLjQgNzMuNjQzOCAzMy4yNSA3NC4xOTM4IDMyLjk1Qzc1LjM3NzEgMzIuMyA3NS45Njg4IDMwLjEgNzUuOTY4OCAyNi4zNUM3NS45Njg4IDIyLjU2NjcgNzUuMzg1NCAyMC4zNDE3IDc0LjIxODggMTkuNjc1QzczLjY2ODggMTkuMzU4MyA3Mi44NjA0IDE5LjIgNzEuNzkzOCAxOS4yQzcwLjcyNzEgMTkuMiA2OS45MTg4IDE5LjM1ODMgNjkuMzY4OCAxOS42NzVaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K" alt="ロゴ"  style="width: 40px;">
               </div>
                <div class="app-cell" style="text-align: right; margin-left: auto; color: #999; font-size: 13px;">
                    株式会社m-Lab<br/>
                    YYYY.MM.DD
                </div>
            </div>
            <div class="app-header-bottom"></div>
			`,
	},
	{
		title: "見出し",
		content: `
        <style>
            .app-title {
                margin-top: 10px;
                padding: 0.5em;
                color: #494949;
                background: #ddd;
                border-left: solid 5px #555;
                text-align: left;
            }
        </style>
        <div class="app-title">
            <div>見出しデザイン</div>
        </div>`,
	},
	{
		title: "お問い合わせ先",
		content: `
			<style>
				.app-contact {
					margin: 10px;
					display: flex;
					padding: 10px;
					font-size: 12px;
					color: #555;
					border: 1px solid #333;
					border-radius: 4px;
				}
				.app-contact-title {
					margin-right: 20px;
			    	font-weight: bold;
				}
        	</style>
        	<div class="app-contact">
				<p class="app-contact-title">お問い合わせ先</p>
				<div>
					<p>株式会社〇〇</p>
					<p>東京都中央区銀座*-*-*</p> 
					<p>企画部 広報担当 せいめい </p>
					<p>email：**@**.jp　tel: ***-****-****</p>
			   	</div>
		   </div>`,
	},
	{
		title: "3カラム",
		content: `
			<style>
				.app-column {
					margin-top: 10px;
					display: flex;
					padding: 10px;
					font-size: 12px;
					color: #555;
					border: 1px solid #333;
					border-radius: 4px;
				}
				.app-column-img-title {
					margin-top: 5px;
				}
				.app-column-img-text {
					margin-top: 5px;
				}
        	</style>
        	<div class="app-column">
				<div class="app-column-item">
                    <img width="80" src="https://placehold.jp/150x150.png"/>
                    <p class="app-column-img-title">image1</p>
                    <p class="app-column-img-text">sample</p>
			   	</div>
			   	<div class="app-column-item" style="padding: 0 18px">
                    <img width="80" src="https://placehold.jp/150x150.png"/>
                    <p class="app-column-img-title">image3</p>
                    <p class="app-column-img-text">sample</p>
			   	</div>
			   	<div class="app-column-item">
                    <img width="80" src="https://placehold.jp/150x150.png"/>
                    <p class="app-column-img-title">image3</p>
                    <p class="app-column-img-text">ssample</p>
			   	</div>
		   </div>`,
	},
	{
		title: "2カラム",
		content: `
			<style>
				.app-column {
					margin-top: 10px;
					display: flex;
					padding: 10px;
					font-size: 12px;
					color: #555;
					border: 1px solid #333;
					border-radius: 4px;
				}
				.app-column-img-title {
					margin-top: 5px;
				}
				.app-column-img-text {
					margin-top: 5px;
				}
        	</style>
        	<div class="app-column">
				<div class="app-column-item" style="padding: 0 10px">
                    <img width="120" src="https://placehold.jp/150x150.png"/>
                    <p class="app-column-img-title">image1</p>
                    <p class="app-column-img-text">sample</p>
			   	</div>
			   	<div class="app-column-item" style="padding: 0 10px">
                    <img width="120" src="https://placehold.jp/150x150.png"/>
                    <p class="app-column-img-title">image2</p>
                    <p class="app-column-img-text">sample</p>
			   	</div>
		   </div>`,
	}
];
