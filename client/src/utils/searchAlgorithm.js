/**
 * Advanced Search Algorithm for ModuleHub
 * Implements fuzzy matching, relevance scoring, and multi-field search
 */

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy matching
 */
const levenshteinDistance = (str1, str2) => {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,     // deletion
                    dp[i][j - 1] + 1,     // insertion
                    dp[i - 1][j - 1] + 1  // substitution
                );
            }
        }
    }

    return dp[m][n];
};

/**
 * Calculate similarity score between 0 and 1
 */
const calculateSimilarity = (str1, str2) => {
    const maxLen = Math.max(str1.length, str2.length);
    if (maxLen === 0) return 1;
    const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
    return 1 - (distance / maxLen);
};

/**
 * Tokenize search query into words
 */
const tokenize = (query) => {
    return query.toLowerCase().trim().split(/\s+/).filter(word => word.length > 0);
};

/**
 * Check if text contains all query tokens
 */
const containsAllTokens = (text, tokens) => {
    const lowerText = text.toLowerCase();
    return tokens.every(token => lowerText.includes(token));
};

/**
 * Calculate relevance score for a package based on search query
 */
const calculateRelevanceScore = (pkg, query, tokens) => {
    let score = 0;
    const queryLower = query.toLowerCase();
    const nameLower = (pkg.name || '').toLowerCase();
    const descLower = (pkg.description || '').toLowerCase();
    const companyName = (pkg.company?.companyName || '').toLowerCase();

    // Exact match in name (highest priority)
    if (nameLower === queryLower) {
        score += 100;
    } else if (nameLower.includes(queryLower)) {
        score += 80;
    } else if (queryLower.includes(nameLower)) {
        score += 60;
    }

    // Name starts with query
    if (nameLower.startsWith(queryLower)) {
        score += 40;
    }

    // Fuzzy match in name
    const nameSimilarity = calculateSimilarity(queryLower, nameLower);
    score += nameSimilarity * 30;

    // Token matching in name
    const nameTokenMatches = tokens.filter(token => nameLower.includes(token)).length;
    score += nameTokenMatches * 20;

    // Description contains query
    if (descLower.includes(queryLower)) {
        score += 25;
    }

    // Token matching in description
    const descTokenMatches = tokens.filter(token => descLower.includes(token)).length;
    score += descTokenMatches * 15;

    // Company name match
    if (companyName.includes(queryLower)) {
        score += 15;
    }

    // All tokens present (bonus)
    if (containsAllTokens(nameLower + ' ' + descLower, tokens)) {
        score += 20;
    }

    // Recency boost (newer packages get slight boost)
    if (pkg.updatedAt) {
        const daysSinceUpdate = (Date.now() - new Date(pkg.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
        if (daysSinceUpdate < 7) score += 5;
        else if (daysSinceUpdate < 30) score += 2;
    }

    return score;
};

/**
 * Main search function
 * @param {Array} items - Array of packages/items to search
 * @param {string} query - Search query string
 * @param {Object} options - Search options
 * @returns {Array} - Sorted array of matching items with relevance scores
 */
export const searchItems = (items, query, options = {}) => {
    if (!query || query.trim() === '') {
        // Return all items sorted by recency if no query
        return items.sort((a, b) => {
            const dateA = new Date(a.updatedAt || a.createdAt || 0);
            const dateB = new Date(b.updatedAt || b.createdAt || 0);
            return dateB - dateA;
        });
    }

    const tokens = tokenize(query);
    const minScore = options.minScore || 0.1;

    // Calculate scores for all items
    const scoredItems = items.map(item => ({
        item,
        score: calculateRelevanceScore(item, query, tokens)
    }));

    // Filter by minimum score and sort by relevance
    return scoredItems
        .filter(({ score }) => score >= minScore)
        .sort((a, b) => b.score - a.score)
        .map(({ item }) => item);
};

/**
 * Quick search - simpler version for basic use cases
 */
export const quickSearch = (items, query) => {
    if (!query || query.trim() === '') return items;

    const queryLower = query.toLowerCase();
    return items.filter(item => {
        const name = (item.name || '').toLowerCase();
        const desc = (item.description || '').toLowerCase();
        const company = (item.company?.companyName || '').toLowerCase();
        
        return name.includes(queryLower) || 
               desc.includes(queryLower) || 
               company.includes(queryLower);
    });
};

