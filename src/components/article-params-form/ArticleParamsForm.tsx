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
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = () => {
	const [isOpen, setOpen] = useState(true);

	const h2props: TextProps = {
		as: 'h2',
		size: 31,
		weight: 800,
		children: 'Задайте параметры',
	};

	const fontSelectProps: SelectProps = {
		selected: fontFamilyOptions[0],
		options: fontFamilyOptions,
		title: 'шрифт',
	};

	const fontSizeRadioGroup: RadioGroupProps = {
		name: '',
		options: fontSizeOptions,
		selected: fontSizeOptions[1],
		title: 'размер шрифта',
	};

	const fontColorSelectProps: SelectProps = {
		selected: fontColors[fontColors.length - 1],
		options: fontColors,
		title: 'цвет шрифта',
	};

	const backgroundColorSelectProps: SelectProps = {
		selected: backgroundColors[backgroundColors.length > 3 ? 3 : 0],
		options: backgroundColors,
		title: 'цвет фона',
	};

	const contentWidthArrSelectProps: SelectProps = {
		selected: contentWidthArr[contentWidthArr.length > 1 ? 1 : 0],
		options: contentWidthArr,
		title: 'цвет фона',
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
