import { StateUpdater, useEffect, useState } from 'preact/hooks';
import type { ChangeEvent, CSSProperties, FormEvent } from 'react';
import client from '../../client/sanity';
import { getDateFormat, getTimeFormat } from '../../lib/helpers';
import useMediaQuery from './useMediaQuery';

export interface Comment {
	_id: string;
	_createdAt: string;
	approved_by_admin: boolean;
	comment: string;
	email: string;
	name: string;
	emailPublic: boolean;
}

interface Props {
	comments: Comment[];
	id: string;
}

export default function Comments({ comments, id }: Props) {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [comment, setComment] = useState<string>('');
	const [hasCommented, setHasCommented] = useState<boolean>(false);
	const [commentsState, setCommentsState] = useState<Comment[]>(comments);
	const [publicEmail, setPublicEmail] = useState<boolean>(false);
	const isMobile = useMediaQuery(600, false);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement>,
		set: StateUpdater<string>
	) => {
		e.preventDefault();
		const { value } = e.currentTarget;
		return set((oldValue) => value);
	};

	const saveComment = async (e: FormEvent) => {
		e.preventDefault();
		if (name === '' || comment === '') return;
		client
			.create({
				_type: 'comment',
				name,
				email,
				comment,
				emailPublic: publicEmail,
				approved_by_admin: false,
				article: {
					_type: 'reference',
					_ref: id,
				},
			})
			.then((res) => {
				console.log(res);

				const commentRes = {
					_createdAt: res._createdAt,
					_id: res._id,
					comment: res.comment,
					email: res.email,
					name: res.name,
					emailPublic: res.emailPublic,
					approved_by_admin: res.approved_by_admin,
				};
				setCommentsState((cur) => [commentRes, ...cur]);
				setHasCommented(true);
				setName('');
				setEmail('');
				setPublicEmail(false);
				setComment('');
			});
	};

	const styles = {
		comments: {
			width: isMobile ? '100%' : 'clamp(50%, 80%, 100%)',
			backgroundColor: 'var(--color-white)',
			marginBlock: '2rem',
			padding: '1em',
		},
		commentsHeading: {
			fontSize: 'var(--step-2)',
			marginBottom: '.5em',
		},
		commentsForm: {
			minHeight: '210px',
			display: hasCommented ? 'grid' : 'block',
			placeItems: 'center',
			justifyContent: 'space-between',
		},
		formTop: {
			display: 'flex',
			flexDirection: isMobile ? 'column' : 'row',
			justifyContent: 'space-between',
			columnGap: '1rem',
		},
		formInputContainer: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			marginBottom: '.4em',
		},
		formInputContainerText: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			marginBottom: '.8em',
		},
		formInputContainerCheck: {
			display: 'flex',
			flexDirection: isMobile ? 'row' : 'column',
			justifyContent: 'space-between',
			width: isMobile ? '100%' : 'max-content',
			alignItems: 'center',
			marginBottom: '.4em',
		},
		formInput: {
			width: '100%',
			padding: '.4em .2em',
		},
		formInputCheck: {
			width: 'fit-content',
			marginBottom: isMobile ? '0em' : '.5em',
		},
		inputLabel: {
			fontSize: 'var(--step-0)',
			marginBottom: '.2em',
		},
		formPrompt: {
			fontSize: 'var(--step--1)',
		},
		submitBtn: {
			width: '100%',
			paddingBlock: '.5em',
			textTransform: 'uppercase',
			fontWeight: 'bold',
			marginBottom: '.4em',
			cursor: 'pointer',
		},
		commentsContainer: {
			marginTop: '2rem',
		},
		comment: {
			marginBottom: '.5em',
			paddingBottom: '.5em',
			width: '100%',
			fontSize: 'var(--step--1)',
			borderBottom: '1px solid rgba(145, 145, 145, 0.281)',
		},
		email: {
			justifySelf: 'left',
			color: 'var(--color-text)',
			cursor: 'pointer',
		},
		commentHeader: {
			display: 'grid',
			gridTemplateColumns: '1fr 1fr 1fr',
			flexDirection: isMobile ? 'column' : 'row',
			justifyContent: 'space-between',
			marginBottom: '.8em',
		},
		name: {
			fontWeight: 'bold',
		},
		createdAt: {
			fontStyle: 'italic',
			gridColumn: '-1 / span1',
		},
		commentText: {},
	};

	return (
		<div style={styles.comments}>
			<h2 style={styles.commentsHeading}>Comments section</h2>
			<form style={styles.commentsForm} onSubmit={saveComment}>
				{!hasCommented ? (
					<>
						<div style={styles.formTop as CSSProperties}>
							<div style={styles.formInputContainer as CSSProperties}>
								<label htmlFor='name' style={styles.inputLabel}>
									Name&#65121;
								</label>
								<input
									type='text'
									style={styles.formInput}
									id='name'
									name='name'
									onChange={(e) => handleChange(e, setName)}
									value={name}
								/>
							</div>
							<div style={styles.formInputContainer as CSSProperties}>
								<label htmlFor='email' style={styles.inputLabel}>
									E-mail address
								</label>
								<input
									type='email'
									style={styles.formInput}
									id='email'
									name='email'
									onChange={(e) => handleChange(e, setEmail)}
									value={email}
								/>
							</div>
							<div style={styles.formInputContainerCheck as CSSProperties}>
								<label htmlFor='private' style={styles.inputLabel}>
									Public?
								</label>
								<input
									type='checkbox'
									style={styles.formInputCheck}
									id='private'
									name='private'
									onChange={(e) => setPublicEmail((old) => !old)}
								/>
							</div>
						</div>
						<div style={styles.formInputContainerText as CSSProperties}>
							<label htmlFor='comment' style={styles.inputLabel}>
								Comment
							</label>
							<input
								type='text'
								style={styles.formInput}
								id='comment'
								name='comment'
								onChange={(e) => handleChange(e, setComment)}
								value={comment}
							/>
						</div>{' '}
					</>
				) : (
					<>
						<p>
							Thank you for commenting. Your comment will be available to
							everyone else once it's been reviewed.
						</p>
					</>
				)}
				<button
					style={styles.submitBtn as CSSProperties}
					type='submit'
					name='submitButton'
					disabled={hasCommented}>
					Comment
				</button>
				{!hasCommented && (
					<p style={styles.formPrompt}>
						&#65121;Mandatory fields. Name will be shown to other readers
					</p>
				)}
			</form>
			<div style={styles.commentsContainer}>
				{comments.length > 0 ? (
					commentsState.map((comment) => {
						return (
							<div style={styles.comment}>
								<div style={styles.commentHeader as CSSProperties}>
									<p style={styles.name as CSSProperties}>{comment.name}</p>
									{comment.emailPublic && (
										<a href={`mailto:${comment.email}`} style={styles.email}>
											{comment.email}
										</a>
									)}
									<p style={styles.createdAt}>
										<span>{getTimeFormat(comment._createdAt)}</span>
										{!isMobile && ', '}
										<span>{getDateFormat(comment._createdAt)}</span>
									</p>
								</div>
								<p style={styles.commentText}>{comment.comment}</p>
							</div>
						);
					})
				) : (
					<p style={styles.formPrompt}>
						No one has commented on this post yet. Be the first one, by entering
						your opinion above.
					</p>
				)}
			</div>
		</div>
	);
}
