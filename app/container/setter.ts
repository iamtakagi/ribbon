import type { Container } from 'inversify';
import type { IArticleD1Repository, IArticleD1RepositoryFactory } from '../repository/types';
import { ArticleD1RepositoryFactory } from '../repository/article';

export const set = (container: Container): void => {
    container.bind<IArticleD1RepositoryFactory>('IArticleRepositoryD1Factory').to(ArticleD1RepositoryFactory).inSingletonScope();
    container.bind<IArticleD1Repository>('IArticleD1Repository').toDynamicValue((context) => {
        const factory = context.container.get<IArticleD1RepositoryFactory>('IArticleD1RepositoryFactory');
        return factory.create();
    }).inSingletonScope();
}