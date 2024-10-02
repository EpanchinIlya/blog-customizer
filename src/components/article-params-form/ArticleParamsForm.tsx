import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { TextProps } from 'src/ui/text/Text';

import { Select } from 'src/ui/select';
import { SelectProps } from 'src/ui/select/Select';

import { RadioGroup } from 'src/ui/radio-group';
import { RadioGroupProps } from 'src/ui/radio-group/RadioGroup';
import { useState } from 'react';

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

export const ArticleParamsForm = () => {
	const [isOpen, setOpen] = useState(true);
	const [fontSelect, setFontSelect] = useState(fontFamilyOptions[0]);
	const [fontSize, setFontSize] = useState(
		fontSizeOptions[fontColors.length > 1 ? 1 : 0]
	);
	const [fontColor, setFontColor] = useState(fontColors[fontColors.length - 1]);
	const [backgroundColor, setbackgroundColor] = useState(
		backgroundColors[backgroundColors.length > 3 ? 3 : 0]
	);
	const [contentWidthArrState, setcontentWidthArr] = useState(
		contentWidthArr[contentWidthArr.length > 1 ? 1 : 0]
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

	return (
		<>
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
				<form className={styles.form}>
					{Text(h2props)}
					{Select(fontSelectProps)}
					{RadioGroup(fontSizeRadioGroup)}
					{Select(fontColorSelectProps)}
					{Separator()}
					{Select(backgroundColorSelectProps)}
					{Select(contentWidthArrSelectProps)}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

// коменты

// ,styles.container_open

{
	/* <aside className={clsx(styles.container,styles.container_open)}></aside> */
}
