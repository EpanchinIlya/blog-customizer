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
	defaultArticleState: formParams;
	onSubmit: (selected: formParams) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { defaultArticleState, onSubmit } = props;
	const rootRef = useRef<HTMLDivElement>(null);
	const [isMenuOpenState, setIsMenuOpen] = useState(false);
	const [fontSelectState, setFontSelectState] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeState, setFontSizeState] = useState(
		defaultArticleState.fontSizeOption
	);
	const [fontColorState, setFontColorState] = useState(
		defaultArticleState.fontColor
	);
	const [backgroundColorState, setbackgroundColorState] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidthArrState, setcontentWidthArrState] = useState(
		defaultArticleState.contentWidth
	);

	const onChangefontSelectProps = (selected: OptionType) => {
		setFontSelectState(selected);
	};
	const onChangefontSizeProps = (selected: OptionType) => {
		setFontSizeState(selected);
	};
	const onChangefontColorProps = (selected: OptionType) => {
		setFontColorState(selected);
	};
	const onChangebackgroundColorProps = (selected: OptionType) => {
		setbackgroundColorState(selected);
	};
	const onChangecontentWidthArrProps = (selected: OptionType) => {
		setcontentWidthArrState(selected);
	};

	const h2props: TextProps = {
		as: 'h2',
		size: 31,
		weight: 800,
		children: 'Задайте параметры',
	};

	const fontSelectProps: SelectProps = {
		selected: fontSelectState,
		options: fontFamilyOptions,
		title: 'шрифт',
		onChange: onChangefontSelectProps,
	};

	const fontSizeRadioGroup: RadioGroupProps = {
		name: '',
		options: fontSizeOptions,
		selected: fontSizeState,
		title: 'размер шрифта',
		onChange: onChangefontSizeProps,
	};

	const fontColorSelectProps: SelectProps = {
		selected: fontColorState,
		options: fontColors,
		title: 'цвет шрифта',
		onChange: onChangefontColorProps,
	};

	const backgroundColorSelectProps: SelectProps = {
		selected: backgroundColorState,
		options: backgroundColors,
		title: 'цвет фона',
		onChange: onChangebackgroundColorProps,
	};

	const contentWidthArrSelectProps: SelectProps = {
		selected: contentWidthArrState,
		options: contentWidthArr,
		title: 'ширина контента',
		onChange: onChangecontentWidthArrProps,
	};

	const formParam = {
		fontFamilyOption: fontSelectState,
		fontColor: fontColorState,
		backgroundColor: backgroundColorState,
		contentWidth: contentWidthArrState,
		fontSizeOption: fontSizeState,
	};

	useOutsideClickClose({
		isOpen: isMenuOpenState,
		rootRef: rootRef,
		onChange: setIsMenuOpen,
	});

	const submitFormHandler = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(formParam);
	};

	const resetFormHandler = () => {
		setFontSelectState(defaultArticleState.fontFamilyOption);
		setFontSizeState(defaultArticleState.fontSizeOption);
		setFontColorState(defaultArticleState.fontColor);
		setbackgroundColorState(defaultArticleState.backgroundColor);
		setcontentWidthArrState(defaultArticleState.contentWidth);

		onSubmit({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSizeOption: defaultArticleState.fontSizeOption,
		});
	};
	return (
		<>
			<div ref={rootRef}>
				<ArrowButton
					isOpen={isMenuOpenState}
					onClick={() => {
						isMenuOpenState ? setIsMenuOpen(false) : setIsMenuOpen(true);
					}}
				/>
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isMenuOpenState === true,
					})}>
					<form className={styles.form} onSubmit={submitFormHandler}>
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
								onClick={resetFormHandler}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
