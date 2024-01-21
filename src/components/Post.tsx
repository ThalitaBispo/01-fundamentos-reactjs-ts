import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar';
import styles from './Post.module.css';
import { Comment } from './Comment';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface PostProps {
    post: PostType;
}

export function Post({ post }: PostProps) {
    //desestrutura para somente buscas a propriedades utilizadas

    // estado = variáveis que eu quero que o componente monitore
    const [comments, setComments] = useState([
        'Post muito bacana, hein?!'
    ])

    const [newCommentText, setNewCommentText] = useState('')
    //importante iniciar o estado no mesmo tipo que será armazenado

    //para formatar a data
    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment(event: FormEvent) {
        //event de formulário
        event.preventDefault() //SPA -> para indicar que vou ficar na mesma página

        //const newCommentText = event.target.comment.value

        setComments([...comments, newCommentText])
        //lê o array 'comments', acrescenta + 1 comentário

        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        //está informando qual o elemento em que aconteceu o evento
        event.target.setCustomValidity('')
        //para poder escrever depois que aparecer a mensagem de campo obrigatório
        setNewCommentText(event.target.value)
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório')
        
    }

    //no React a gnt nunca altera uma informação
    //sempre criamos uma nova informação e salvamos no Estado

    function deleteComment(commentToDelete: string) {

    //imutabilidade -> as variáveis não sofrem mutação
    //nós nunca alteramos uma variável na memória
    //nós criamos um novo valor (um novo espaço na memória)

    const commentsWithoutDeletedOne = comments.filter(comment => {
        return comment !== commentToDelete;
    })
    //vai gerar uma nova lista, mas sem o comentário que deletou

    setComments(commentsWithoutDeletedOne);
    //atualiza a lista

    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {/* percorrer o array */}
                {post.content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>;
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href='#'>{line.content}</a></p>;
                        //colocar no primeiro elemento do retorno de um map
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    name='comment'
                    value={newCommentText}
                    placeholder='Deixe seu comentário'
                    onChange={handleNewCommentChange}
                    //monitorar quando houver mudança no conteúdo
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (<Comment 
                                key={comment} 
                                content={comment}
                                //passando o texto 
                                onDeleteComment={deleteComment}
                                //pode ser o mesmo nome
                                //passando a função como propriedade
                                //para fazer um componente se comunicar com outro
                            />)
                     
                })}
            </div>

        </article>
    )
}