import type { Container } from 'inversify';
import type { IArticleRepository, IArticleRepositoryFactory } from '../repository/types';
import { ArticleRepositoryFactory } from '../repository/article';

export const set = (container: Container): void => {
    container.bind<IArticleRepositoryFactory>('IArticleRepositoryFactory').to(ArticleRepositoryFactory).inSingletonScope();
    container.bind<IArticleRepository>('IArticleRepository').toDynamicValue((context) => {
        const factory = context.container.get<IArticleRepositoryFactory>('IArticleRepositoryFactory');
        return factory.create();
    }).inSingletonScope();
}