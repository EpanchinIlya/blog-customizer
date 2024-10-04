import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { TextProps } from 'src/ui/text/Text';

import { Select } from 'src/ui/select';
import { SelectProps } from 'src/ui/select/Select';

import { RadioGroup } from 'src/ui/radio-group';
import { RadioGroupProps } from 'src/ui/radio-group/RadioGroup';
import { FormEvent, useRef, useState } from 'react';
import { useOutsideClickClose } from './useOutsideClickClose';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

type formParams = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
};

type ArticleParamsFormProps = {
	defArticleState: formParams;
	onSubmit: (selected: formParams) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { defArticleState, onSubmit } = props;
	const rootRef = useRef<HTMLDivElement>(null);
	const [isOpen, setOpen] = useState(false);
	const [fontSelect, setFontSelect] = useState(
		defArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defArticleState.fontColor);
	const [backgroundColor, setbackgroundColor] = useState(
		defArticleState.backgroundColor
	);
	const [contentWidthArrState, setcontentWidthArr] = useState(
		defArticleState.contentWidth
	);

	const onChangefontSelectProps = (selected: OptionType) => {
		setFontSelect(selected);
	};
	const onChangefontSizeProps = (selected: OptionType) => {
		setFontSize(selected);
	};
	const onChangefontColorProps = (selected: OptionType) => {
		setFontColor(selected);
	};
	const onChangebackgroundColorProps = (selected: OptionType) => {
		setbackgroundColor(selected);
	};
	const onChangecontentWidthArrProps = (selected: OptionType) => {
		setcontentWidthArr(selected);
	};

	const h2props: TextProps = {
		as: 'h2',
		size: 31,
		weight: 800,
		children: 'Задайте параметры',
	};

	const fontSelectProps: SelectProps = {
		selected: fontSelect,
		options: fontFamilyOptions,
		title: 'шрифт',
		onChange: onChangefontSelectProps,
	};

	const fontSizeRadioGroup: RadioGroupProps = {
		name: '',
		options: fontSizeOptions,
		selected: fontSize,
		title: 'размер шрифта',
		onChange: onChangefontSizeProps,
	};

	const fontColorSelectProps: SelectProps = {
		selected: fontColor,
		options: fontColors,
		title: 'цвет шрифта',
		onChange: onChangefontColorProps,
	};

	const backgroundColorSelectProps: SelectProps = {
		selected: backgroundColor,
		options: backgroundColors,
		title: 'цвет фона',
		onChange: onChangebackgroundColorProps,
	};

	const contentWidthArrSelectProps: SelectProps = {
		selected: contentWidthArrState,
		options: contentWidthArr,
		title: 'цвет фона',
		onChange: onChangecontentWidthArrProps,
	};

	const formParam = {
		fontFamilyOption: fontSelect,
		fontColor: fontColor,
		backgroundColor: backgroundColor,
		contentWidth: contentWidthArrState,
		fontSizeOption: fontSize,
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setOpen,
	});

	const formSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(formParam);
	};

	const formResetHandler = () => {
		setFontSelect(defArticleState.fontFamilyOption);
		setFontSize(defArticleState.fontSizeOption);
		setFontColor(defArticleState.fontColor);
		setbackgroundColor(defArticleState.backgroundColor);
		setcontentWidthArr(defArticleState.contentWidth);

		onSubmit({
			fontFamilyOption: defArticleState.fontFamilyOption,
			fontColor: defArticleState.fontColor,
			backgroundColor: defArticleState.backgroundColor,
			contentWidth: defArticleState.contentWidth,
			fontSizeOption: defArticleState.fontSizeOption,
		});
	};
	return (
		<>
			<div ref={rootRef}>
				<ArrowButton
					isOpen={isOpen}
					onClick={() => {
						isOpen ? setOpen(false) : setOpen(true);
					}}
				/>
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen === true,
					})}>
					<form className={styles.form} onSubmit={formSubmitHandler}>
						{Text(h2props)}
						{Select(fontSelectProps)}
						{RadioGroup(fontSizeRadioGroup)}
						{Select(fontColorSelectProps)}
						{Separator()}
						{Select(backgroundColorSelectProps)}
						{Select(contentWidthArrSelectProps)}
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={formResetHandler}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
