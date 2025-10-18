interface CreateArticleDto { // Data Transfer Object
    title: string,
    description: string
}

interface UpdateArticleDto { // Data Transfer Object
    title?: string,
    description?: string
}

interface RegisterUserDto { // Data Transfer Object
    username: string,
    email: string,
    password: string
}

interface LoginUserDto { // Data Transfer Object
    email: string,
    password: string
}

interface UpdateUserDto { // Data Transfer Object
    username?: string,
    email?: string,
    password?: string,
}

interface CreateCommentDto { // Data Transfer Object
    text: string,
    articleId: number,
}

interface UpdateCommentDto { // Data Transfer Object
    text: string,
}

