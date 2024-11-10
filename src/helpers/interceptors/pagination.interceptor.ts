import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                if (!Array.isArray(data)) {
                    return data;
                }

                const request = context.switchToHttp().getRequest();
                const noPagination = request.query.noPagination === 'true';

                if (noPagination) {
                    return {
                        data,
                        meta: {
                            total: data.length,
                            per_page: data.length,
                            current_page: 1,
                            last_page: 1
                        }
                    };
                }

                const page = parseInt(request.query.page) || 1;
                const limit = parseInt(request.query.limit) || 6;
                const total = data.length;
                const totalPages = Math.ceil(total / limit);
                const currentUrl = `${request.protocol}://${request.get('host')}${request.originalUrl.split('?')[0]}`;

                const startIndex = (page - 1) * limit;
                const endIndex = startIndex + limit;
                const paginatedData = data.slice(startIndex, endIndex);

                return {
                    data: paginatedData,
                    meta: {
                        first_page_url: `${currentUrl}?page=1&limit=${limit}`,
                        from: (page - 1) * limit + 1,
                        last_page: totalPages,
                        last_page_url: `${currentUrl}?page=${totalPages}&limit=${limit}`,
                        next_page_url: page < totalPages ? `${currentUrl}?page=${page + 1}&limit=${limit}` : null,
                        path: currentUrl,
                        per_page: limit,
                        prev_page_url: page > 1 ? `${currentUrl}?page=${page - 1}&limit=${limit}` : null,
                        to: Math.min(page * limit, total),
                        total,
                        current_page: page
                    },
                };
            })
        );
    }
}