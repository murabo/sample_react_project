import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from "@material-ui/core/Typography";
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

// img
import IconMedia from "../../assets/guide/media.svg";
import IconPublic from "../../assets/guide/public.svg";
import IconPressKit from "../../assets/guide/press_kit.png";
import IconFlow from "../../assets/guide/flow.png";
import IconSend from "../../assets/guide/send.png";
import IconWrite from "../../assets/guide/write.png";

import PressRelease from "../Help/PressRelease";
import Send from "../Help/Send";
import Flow from "../Help/Flow";
import Media from "../Help/Media";
import Public from "../Help/Public";
import PressKit from "../Help/PressKit";

//model
import GuideDialog from "./Dialog";

const List = () => {

	const classes = useStyles();
	const [dialog, setDialog] = React.useState<boolean>(false);
	const [component, setComponent] = React.useState(<div></div>);

	const handleOpenDialog = () => {
		setDialog(true)
	}

	return (
		<>
			<GuideDialog isOpen={dialog} handleClose={()=>setDialog(false)} component={component}/>
			<ul className={classes.list}>
				<li>
					<Card className={classes.card} 	onClick={()=> {
						setComponent(<PressRelease/>)
						handleOpenDialog()
					}}>
						<CardActionArea>
							<CardMedia
								className={classes.media}
								image={IconWrite}
								title="Contemplative Reptile"
							/>
							<CardContent className={classes.content}>
								<Typography variant="h4">
									簡単プレスリリース作成
								</Typography>
								<Typography gutterBottom variant="h6">
									豊富なテンプレート・エディタ
								</Typography>
								<Typography variant="body1" color="textSecondary" component="p">
									プレスリリースのテーマに応じたテンプレートを用意。<br/>
									直感的に操作できるエディタで、美しいプレスリリース作成を簡単に。<br/>
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</li>
				<li>
					<Card className={classes.card} onClick={()=> {
						setComponent(<Send/>)
						handleOpenDialog()
					}}>
						<CardActionArea>
							<CardMedia
								className={classes.media}
								image={IconSend}
								title="Contemplative Reptile"
							/>
							<CardContent className={classes.content}>
								<Typography variant="h4">
									企業とメディアを繋ぐ
								</Typography>
								<Typography gutterBottom variant="h6">
									自動AI選定
								</Typography>
								<Typography variant="body1" color="textSecondary" component="p">
									文章から届けるべき最適なメディアをAIが自動選定。<br/>
									たくさんメディアにアプローチが可能にします。
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</li>
				<li>
					<Card className={classes.card} onClick={()=> {
						setComponent(<Flow/>)
						handleOpenDialog()
					}}>
						<CardActionArea>
							<CardMedia
								className={classes.media}
								image={IconFlow}
								title="Contemplative Reptile"
							/>
							<CardContent className={classes.content}>
								<Typography variant="h4">
									承認フローで安全に
								</Typography>
								<Typography gutterBottom variant="h6">
									校閲・コメント・承認・履歴管理
								</Typography>
								<Typography variant="body1" color="textSecondary" component="p">
									校閲から配信承諾のプロセスを可視化。<br/>
									プレスリリースの校閲・修正依頼をスムーズにします。
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</li>
				<li>
					<Card className={classes.card} onClick={()=> {
						setComponent(<Media/>)
						handleOpenDialog()
					}}>
						<CardActionArea>
							<CardMedia
								className={classes.mediaSvg}
								image={IconMedia}
								title="Contemplative Reptile"
							/>
							<CardContent className={classes.content}>
								<Typography variant="h4">
									メディアリスト
								</Typography>
								<Typography gutterBottom variant="h6">
									配信が楽々、開封確認も可能
								</Typography>
								<Typography variant="body1" color="textSecondary" component="p">
									メディアリストを登録しておけば、配信が楽々。<br/>
									ナレッジも貯められます。
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</li>
				<li>
					<Card className={classes.card} onClick={()=> {
						setComponent(<Public/>)
						handleOpenDialog()
					}}>
						<CardActionArea>
							<CardMedia
								className={classes.mediaSvg}
								image={IconPublic}
								title="Contemplative Reptile"
							/>
							<CardContent className={classes.content}>
								<Typography variant="h4">
									リリースページ生成
								</Typography>
								<Typography gutterBottom variant="h6">
									PDFとwebページ同時作成
								</Typography>
								<Typography variant="body1" color="textSecondary" component="p">
									プレスリリースページの作成と同時に、webページが生成され、<br/>
									自社用のプレスリリースページととしてご活用いただけます。
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</li>
				<li>
					<Card className={classes.card} onClick={()=> {
						setComponent(<PressKit/>)
						handleOpenDialog()
					}}>
						<CardActionArea>
							<CardMedia
								className={classes.media}
								image={IconPressKit}
								title="Contemplative Reptile"
							/>
							<CardContent className={classes.content}>
								<Typography gutterBottom variant="h4">
									プレスキット
								</Typography>
								<Typography variant="body1" color="textSecondary" component="p">
									メディアに提供すべき企業情報ややサービスの画像、ロゴをクラウド上ひとつに集約。<br/>
									webからダウンロード可能。データの受け渡しの手間を省きます。
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</li>
			</ul>
		</>
	);
};

export default List



const useStyles = makeStyles({
	list: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center"
	},
	card: {
		maxWidth: 280,
		margin: 10,
	},
	content: {
		height: 205,
	},
	media: {
		height: 100,
		backgroundSize: "100px auto"
	},
	mediaSvg: {
		height: 100,
		backgroundSize: "40px auto"
	},
});
