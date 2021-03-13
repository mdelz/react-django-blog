from rest_framework import filters
from .models import Post


class IsAuthor(filters.BaseFilterBackend):
    """
    Filter that only allows users to see their own objects.
    """

    def filter_queryset(self, request, queryset, view):
        return queryset.filter(author=request.user)


class CanReadPost(filters.BaseFilterBackend):
    """
    Filter that only shows posts that the user is allowed to read.
    """

    def filter_queryset(self, request, queryset, view):
        filters = {"state": Post.Status.PUBLISHED}
        excludes = {}
        user = request.user
        if user.is_authenticated:
            if not user.has_perm("blog.can_read_all_post"):
                if not user.has_perm("blog.can_read_restricted_post"):
                    filters["visibility"] = Post.Visibility.PUBLIC
                else:
                    excludes["visibility"] = Post.Visibility.PRIVATE
        else:
            filters["visibility"] = Post.Visibility.PUBLIC

        filtered = queryset.filter(**filters)
        return filtered if not excludes else filtered.excludes(**excludes)
