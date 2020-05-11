import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    EDITOR_BASIC_TYPE,
	EDITOR_PARTS_TYPE,
} from "../../../../../config/editor_category_type";

import { FormControl,  makeStyles, Tabs, Tab } from "@material-ui/core/";
import Pagination from "../../../Pagination";

// state
import { RootState } from "../../../../../reducers";
import * as BlockActionCreators from "../../../../../actions/Block/ActionCreator";
import { Template } from "./Template";

const blockSelector = (state: RootState) => state.block;

const useStyles = makeStyles({
	tabs: {
		height: "4rem",
	},
	tab: {
		fontSize: 12,
		minWidth: 150,
		height: 40,
	},
});


interface IProps {
	editor: any,
}

const BlockPanel: React.FC<IProps> = ({ editor }) => {

	const classes = useStyles();
	const [tabIndex, setTabIndex] = React.useState(0);
	const [templateBlocks, setTemplateBlocks] = useState([]);
	const [count, setCount] = React.useState(0);

	const dispatch = useDispatch();
	const blocks = useSelector(blockSelector);
	const allBlocks = editor.BlockManager.getAll();

	const basicBlocks = allBlocks.filter((block: any) => {
		const name = block.attributes.category.id
		return name === EDITOR_BASIC_TYPE || name === EDITOR_PARTS_TYPE
	});

	const frame = document.querySelector('.gjs-blocks-cs') as HTMLElement;

	// tab
	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setTabIndex(newValue);
		switch (newValue) {
			case 0:
				editor.BlockManager.render(basicBlocks);
				frame.style.top = '50px';
				break;
			case 1:
				createBlock()
				break;
		}
		frame.scrollTop = 0;
	};

	// BlockManage 作成
	const createBlock = () => {
		//　タイトル更新イベント追加
		if (frame) frame.style.top = '90px';
		const list: any = [];
		blocks.results.forEach(function(block, index) {
			const renderBlock: any = Object.assign({}, block);
			const { id, title, content } = block;
			renderBlock.render = () => `<div class="customBlockItem" draggable="false">
							<div class="customBlockTitle">
								<p class="title">${title}</p>
								<div class="form" data-id="${id}">
									<input type="text" placeholder="タイトル" value=${title}/>
									 <Button class="blockSave">
										更新
									</Button>
								</div>
							</div>
							<a class="blockEdit" data-id="${id}"></a>
							<a class="blockDelete" data-id="${id}"></a>
							<div class="move customBlockContent" draggable="true">${block.content}</div>
							</div>`;
			list.push(renderBlock);
		});

		editor.BlockManager.render(list);
		setTabIndex(1);

		const targets: any = document.getElementsByClassName("customBlockItem");
		const deleteTargets: any = document.getElementsByClassName("blockDelete");
		const editTargets: any = document.getElementsByClassName("blockEdit");
		const saveTargets: any = document.getElementsByClassName("blockSave");

		for (let i = 0; i < targets.length; i++) {
			if (deleteTargets[i]) {
				deleteTargets[i].addEventListener("click", (e) => {
					const id: number = e.target.getAttribute("data-id");
					dispatch(BlockActionCreators.deleteBlock.request({ id }));
				}, false);
			}

			if (saveTargets[i]) {
				saveTargets[i].addEventListener("click", (e) => {
					const id: number = e.target.parentNode.getAttribute("data-id");
					const title: string = e.target.previousElementSibling.value;
					dispatch(BlockActionCreators.patchBlock.request({ id, title }));
					const parent = e.target.closest('.customBlockItem')
					if (parent){
						parent.querySelector('.form').style.display = 'none'
						parent.querySelector('.title').style.display = 'block'
					}

				}, false);
			}

			if (editTargets[i]) {
				editTargets[i].addEventListener("click", (e) => {
					const parent = e.target.closest('.customBlockItem')
					if (parent){
						parent.querySelector('.title').style.display = 'none'
						parent.querySelector('.form').style.display = 'block'
					}
				}, false);
			}
		}

		setCount(count+1)
		editor.Panels.getButton("views", "open-blocks").set("active", true);

		if (count === 1) {
			editor.BlockManager.render(basicBlocks);
			if (frame) frame.style.top = '50px';
			setTabIndex(0);
		}

	};

	useEffect(() => {
		editor.BlockManager.render(basicBlocks);
	}, []);


	useEffect(() => {
		createBlock()
	}, [blocks.results]);


	useEffect(() => {
		dispatch(BlockActionCreators.getBlock.request({offset: 1}));
		const list: any = [];
		Template.forEach(function(block) {
			const renderBlock: any = Object.assign({}, block);
			const { title, content } = block;
			renderBlock.render = () => `<div class="customBlockItem" draggable="false">
							<div class="customBlockTitle">
								${title}
							</div>
							<div class="move customBlockContent" draggable="true">${content}</div>
							</div>`;
			list.push(renderBlock);
		});
		setTemplateBlocks(list);
	}, []);

	const handlePageChange = (pageNumber) => {
		dispatch(BlockActionCreators.getBlock.request({offset: pageNumber}))
	};

	return (
		<>
			<FormControl>
				<Tabs
					classes={{ root: classes.tabs }}
					value={tabIndex}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
				>
					<Tab label="素材" classes={{ root: classes.tab }}/>
					<Tab label="オリジナル" classes={{ root: classes.tab }}/>
				</Tabs>

				{!blocks.results.length && tabIndex === 1 &&
					<p className='noData'>パーツを登録すると表示されます</p>
				}

			</FormControl>
			{blocks.results.length > 0 && tabIndex === 1  &&
				<Pagination
					activePage={blocks.offset}
					totalCount={blocks.count}
					handlePageChange={handlePageChange}
				/>
			}
			</>
	);
};

export default BlockPanel;

