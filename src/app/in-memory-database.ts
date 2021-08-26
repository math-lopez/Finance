import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

import { Category } from './pages/categories/shared/category.model'

export class InMemoryDatabase implements InMemoryDbService {

    createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
        const categories: Category[] = [
            { id: 1, name: "Moradia", description: "Cinema, parques, praia, etc" },
            { id: 2, name: "Saúde", description: "Cinema, parques, praia, etc" },
            { id: 3, name: "Lazer", description: "Cinema, parques, praia, etc" },
            { id: 4, name: "Salário", description: "Cinema, parques, praia, etc" }
        ]

        return { categories }
    }

}
